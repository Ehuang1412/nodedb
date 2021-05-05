const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator/check');
const flash = require('connect-flash');
const session = require('express-session'); 

mongoose.connect('mongodb+srv://subscriber:JBMcjDV8r0fTO2Fm@cluster0.ei6zq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); // mongodb user: subscriber JBMcjDV8r0fTO2Fm
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');


// Load View Engine
app.set('views', path.join(__dirname, 'views')); // Specified folder where our views will be kept or our templates
app.set('view engine','pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res); //global variable to a library called 'express-messages'
  next();
});

//Express Validator Middleware (no longer required)
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value){
//     var namespace = param.split('.'),
//     root = namespace.shift(),
//     formParam = root;
 

//     while(namespace.length){
//       formPram += '[' + namespace.shift() + ']';
//     }
//     return {
//       param :formParam,
//       msg :msg,
//       value:value
//     };
//   }
// });

// Home Route
app.get('/', async (req,res)=>{

  // let articles = [
  //   {
  //     id: 1,
  //     title: 'Have you recently been cheated on?',
  //     author: 'NBC',
  //     body:'Cry it all out first baby'
  //   },
  //   {
  //     id: 2,
  //     title: 'Should you get revenge?',
  //     author: 'Genie in a Bottle',
  //     body: 'Yes'
  //   },
  //   {
  //     id: 3,
  //     title: 'How to Avoid Being Gaslit',
  //     author:'Emily Huang',
  //     body: 'Show them this article'
  //   }
  // ]
  // console.log('...require:\n',Article);
  // console.log('...model:\n',mongoose.model('Article'));
  // console.log(Object.keys(Article));
  // console.log('...\n',Article.collection);
  // console.log('3...\n',Object.keys(Article.collection.collectionName));
  // const arts = await Article.find({});
  
  // console.log('ARTS',arts)

  Article.find({}, function(err, articles){
    // console.log('db:',db.name);
    //   console.log('properties:\n',Object.keys(db.models));
    //   console.log('properties:\n',Object.keys(db.models['Article']['schema']));
    if(err){
      console.log(err);
    }
    else{
      
      console.log("RENDER INDEX")
      res.render('index',{
        title:'Articles',
        articles: articles
      });//view
    }
  });
  
      // res.render('index',{
      //   title:'Articles',
      //   articles: articles
      // });//view
    
});

// Route File
let articles = require('./routes/articles');
app.use('/articles', articles );

// Start Server
app.listen(3000, function(){
  console.log('Server startd on port 3000...');
});



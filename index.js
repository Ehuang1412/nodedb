const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
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
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
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





// Get Single Article
router.get('/:id', function(req,res){
  console.log('\narticle:\n\n');
  Article.findById(req.params.id, function(err,article){

    console.log('article:')
    console.log(article);

    res.render('article',{
      article:article
    });
    return;
  })
});
  
// Add Route
router.get('/add', function(req,res){
  res.render('add_article',{
    title:'Add Article'
  });
});

// Add Submit POST Route
router.post('/add',
  [
    check('title').isLength({min:1}).trim().withMessage('Title required'),
    check('author').isLength({min:1}).trim().withMessage('Author required'),
    check('body').isLength({min:1}).trim().withMessage('Body required')
  ],
  
  function(req,res,next){

    req.checkBody('title','Title is required').notEmpty();
    req.checkBody('author','author is required').notEmpty();
    req.checkBody('body','body is required').notEmpty();
    let article  = new Article();
    article.title = req.body.title; //body parser
    article.author = req.body.author;
    article.body = req.body.body;
    //db.articles.find().pretty(); in mongodb

    //Get Errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      console.log(errors);
        res.render('add_article',
          {
            title: 'Aadd Article',
            article:article,
            errors:errors.mapped()
          }
        );
    }
    else{
      article.title = req.body.title;
      article.author = req.body.author;
      article.body = req.body.body;

      article.save(function(err){
        if(err){
          console.log(err);
          throw err;
          return;

        }else{
          req.flash('success', 'Article Added');
          res.redirect('/');
        }
      }); 
    }

  }
);

// Load Edit Form
router.get('/edit/:id', function(req,res){
  
  Article.findById(req.params.id, function(err,article){
    res.render('edit_article',{
      article:article
    });
    return;
  })
});

// Update Submit POST Route
router.post('/edit/:id', function(req,res){
  console.log('funcion callto edit')
  let article  = {};
  article.title = req.body.title; //body parser
  article.author = req.body.author;
  article.body = req.body.body;
  console.log('edit article:',req.body.title, req.body.author, req.body.body);

  let query = {_id:req.params.id};

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });

});

// Delete Article
router.delete('/:id', function(req,res){
  let query = {_id:req.params.id}//comes from the url

  Article.remove(query, function(err){
    if( err ){
      console.log(err);
    }
    // Sending a response after making a request from the main.js script(more secure)
    res.send('Success');
  });
});







// Route File
let articles = require('./routes/articles');
app.use('/articles', articles );

// Start Server
app.listen(3000, function(){
  console.log('Server startd on port 3000...');
});

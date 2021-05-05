const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
app.get('/article/:id', function(req,res){
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
app.get('/articles/add', function(req,res){
  res.render('add_article',{
    title:'Add Article'
  });
});

// Add Submit POST Route
app.post('/articles/add', function(req,res){
  let article  = new Article();
  article.title = req.body.title; //body parser
  article.author = req.body.author;
  article.body = req.body.body;
  //db.articles.find().pretty(); in mongodb

  article.save(function(err){
    if(err){
      console.log(err);
      return;

    }else{
      res.redirect('/');
    }
  });

});

// Load Edit Form
app.get('/article/edit/:id', function(req,res){
  
  Article.findById(req.params.id, function(err,article){
    res.render('edit_article',{
      article:article
    });
    return;
  })
});

// Update Submit POST Route
app.post('/articles/edit/:id', function(req,res){
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
      res.redirect('/');
    }
  });

});

// Delete Article
app.delete('/article/:id', function(req,res){
  let query = {_id:req.params.id}//comes from the url

  Article.remove(query, function(err){
    if( err ){
      console.log(err);
    }
    // Sending a response after making a request from the main.js script(more secure)
    res.send('Success');
  });
});

// Start Server
app.listen(3000, function(){
  console.log('Server startd on port 3000...');
});



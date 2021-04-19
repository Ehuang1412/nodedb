const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

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
  console.log('...require:\n',Article);
  console.log('...model:\n',mongoose.model('Article'));
  console.log(Object.keys(Article));
  console.log('...\n',Article.collection);
  console.log('3...\n',Object.keys(Article.collection.collectionName));
  const arts = await Article.find({});
  
  console.log('ARTS',arts)

  Article.find({}, function(err, articles){
    console.log('db:',db.name);
      console.log('properties:\n',Object.keys(db.models));
      console.log('properties:\n',Object.keys(db.models['Article']['schema']));
    if(err){
      console.log(err);
    }
    else{
      
      
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
  
// Add Route
app.get('/articles/add', function(req,res){
  res.render('add_article',{
    title:'Add Article'
  });
});

// Start Server
app.listen(3000, function(){
  console.log('Server startd on port 3000...');
});



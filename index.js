const express = require('express');
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views')); // Specified folder where our views will be kept or our templates
app.set('view engine','pug');

// Home Route
app.get('/', function(req,res){
  let articles = [
    {
      id: 1,
      title: 'Have you recently been cheated on?',
      author: 'NBC',
      body:'Cry it all out first baby'
    },
    {
      id: 2,
      title: 'Should you get revenge?',
      author: 'Genie in a Bottle',
      body: 'Yes'
    },
    {
      id: 3,
      title: 'How to Avoid Being Gaslit',
      author:'Emily Huang',
      body: 'Show them this article'
    }
  ]
  res.render('index',{
    title:'Articles',
    articles: articles
  });//view
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
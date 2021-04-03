const express = require('express');
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views')); // Specified folder where our views will be kept or our templates
app.set('view engine','pug');

// Home Route
app.get('/', function(req,res){
  res.render('index',{
    title:'Aricels'
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
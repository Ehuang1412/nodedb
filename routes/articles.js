const express = require('express');
const router = express.Router();

// Bring in Article Models
let Article = require('../models/article');


  
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

module.exports = router;
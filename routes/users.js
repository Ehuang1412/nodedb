const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator/check');
const flash = require('connect-flash');
const session = require('express-session'); 

//Bring in User Model
let User = require('../models/user');

// REQUEST FUNCTIONS

//Register Form
router.get('/register', function(req,res){
  res.render('register');
});

// Register Process
router.post('/register', 
   [
    check('Name').isLength({min:1}).trim().withMessage('Name is required'),
    check('email').normalizeEmail().isEmail().withMessage('Email is required'),
    check('username').isLength({min:1}).trim().withMessage('Username is required'),
    check('password').isLength({min:1}).trim().withMessage('Password is required'),
    check('password2').isLength({min:1}).trim().withMessage('Password do not match'),
    check('password2').isLength({min:1}).trim().withMessage('Passwords do not match')
  ],
  function(req,res,next){
  

      //Get Errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      console.log(errors);
        res.render('register',
          {
            errors:errors.mapped()
          }
        );
    }
    else{
      let newUser = newUser({
        name: name,
        email: email,
        username:username,
        password:password
      }); 
    }
})

// Register Process
router.post('/register', function(req,res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  // req.checkBody('Name','Name is required').notEmpty();
  // req.checkBody('email','Email is required').notEmpty();
  // req.checkBody('email','Email is not valid').isEmail();
  // req.checkBody('username','Username is required').notEmpty();
  // req.checkBody('password','Password is required').notEmpty();
  // req.checkBody('password2','Password do not match').notEmpty();
  // req.checkBody('password2','Passwords do not match').equals(req.body.password);
})

module.exports = router;
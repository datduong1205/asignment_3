var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
const e = require('connect-flash');
let User = userModel.User;

router.get('/login', function(req, res, next) {
  if(!req.user)
  {
    res.render('auth/login',
    {
      title:'Login',
      message: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else {
    return res.redirect('/home')
  }
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', (err, User, info) => {
    // server error
    if(err)
    {
      return next(err);
    }
    // login error
    if(!User)
    {
      req.flash('loginMessage',
      'AuthenticationError');
      return res.redirect('/login')
    }
    req.login(User, (err)=>{
      if(err)
      {
        return next(err)
      }
      return res.redirect('/workout')
    })
  }) (req, res, next)// if authenticate for google dont use local use google
})

router.get('/register', function(req, res, next) {
  if(!req.user)
  {
    res.render('auth/register',
    {
      title:'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else {
    return res.redirect('/')
  }
});

router.post('/register', function(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    // password: request.body.password
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      console.log("Error in inserting a new user")
      if(err.name == 'userExistError')
      {
        req.flash('registerMessage',
        'Registration Error: User already Exist')
      }
      return res.render('auth/register',
      {
        title:'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/workout')
      })
    }
  })
})

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/home')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home'  
  });
});


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Home'  
  });
});


/* GET exercise page. */
router.get('/exercise', function(req, res, next) {
  res.render('exercise', { 
    title: 'Exercise'  
  });
});

/* GET Contact page. */
router.get('/contactus', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact'  
  });
});

module.exports = router;

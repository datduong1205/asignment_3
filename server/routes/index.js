var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home'  
  });
});
*/

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

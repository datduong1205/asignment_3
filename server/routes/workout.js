var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let workout = require('../models/workout');
let workoutController = require('../controllers/workout')
let mongoose = require('mongoose');

// helper function
function requireAuth(req, res, next) {
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

/* Get route for the Bio workouts list */
// Read Operation
router.get('/', workoutController.Dislayworkout);
/* Get route for Add workout page --> Create */
router.get('/add', requireAuth, workoutController.Addworkout); 
/* Post route for Add workout page --> Create */
router.post('/add', requireAuth, workoutController.Processworkout);
/* Get route for displaying the Edit workout page --> Update */
router.get('/edit/:id', requireAuth, workoutController.Editworkout);
/* Post route for processing the Edit workout page --> Update */
router.post('/edit/:id', requireAuth, workoutController.ProcessEditworkout);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, workoutController.Deleteworkout);

module.exports = router;
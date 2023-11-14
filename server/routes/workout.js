var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let workout = require('../models/workout');
let workoutController = require('../controllers/workout')
/* Get route for the Bio workouts list */
// Read Operation
router.get('/', workoutController.Dislayworkout);
/* Get route for Add workout page --> Create */
router.get('/add', workoutController.Addworkout); 
/* Post route for Add workout page --> Create */
router.post('/add', workoutController.Processworkout);
/* Get route for displaying the Edit workout page --> Update */
router.get('/edit/:id', workoutController.Editworkout);
/* Post route for processing the Edit workout page --> Update */
router.post('/edit/:id', workoutController.ProcessEditworkout);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', workoutController.Deleteworkout);
 module.exports = router;
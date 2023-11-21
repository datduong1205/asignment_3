var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let workout = require('../models/workout');

module.exports.Dislayworkout = async (req,res,next)=>{ //< Mark function as async
    try{
       const workoutlist = await workout.find(); //< Use of await keyword
       res.render('workout/list', {
          title: 'Workout List', 
          workoutlist: workoutlist,
          displayName: req.user ? req.user.displayName: ''
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('workout/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.Addworkout = async (req,res,next)=>{
    try{
        res.render('workout/add',
        {
            title:'Add Workout',
            displayName: req.user ? req.user.displayName: ''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.Processworkout = async (req,res,next)=>{
    try{
        let newworkout = workout({
            "Name": req.body.Name,
            "Weight": req.body.Weight,
            "Exercise": req.body.Exercise,
            "Reps": req.body.Reps,
            "Calories_Burned": req.body.Calories_Burned,
            "Rest": req.body.Rest,
        });
        workout.create(newworkout).then(() =>{
            res.redirect('/workout')
        console.log(newworkout.Weight)
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.Editworkout = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const workoutToEdit = await workout.findById(id);
    res.render('workout/edit',
    {
        title:'Edit workout',
        displayName: req.user ? req.user.displayName: '',
        workout:workoutToEdit
    })
}
catch(error){
    console.error(err);
    res.render('workout/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditworkout = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedworkout = workout({
            "_id": id,
            "Name": req.body.Name,
            "Weight": req.body.Weight,
            "Exercise": req.body.Exercise,
            "Reps": req.body.Reps,
            "Calories_Burned": req.body.Calories_Burned,
            "Rest": req.body.Rest
        });
        workout.findByIdAndUpdate(id,updatedworkout).then(()=>{
            res.redirect('/workout')
        });
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.Deleteworkout = (req,res,next)=>{
    try{
        let id = req.params.id;
        workout.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/workout')
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
}
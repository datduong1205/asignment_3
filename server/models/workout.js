let mongoose = require("mongoose");

// create a book model
let workoutModel = mongoose.Schema(
  {
    Name:String,
    Weight:String,
    Exercise:String,
    Reps:Number,
    Calories_Burned:Number,
    Rest:String,
  },
  {
    collection: "workout",
  }
);

module.exports = mongoose.model("workout", workoutModel);
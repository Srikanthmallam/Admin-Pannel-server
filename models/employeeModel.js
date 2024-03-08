const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  id:{type : Number, required:true},
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  courses: {
    type: [String],
    required:true,
   
  },
  image:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Employee", employeeSchema);

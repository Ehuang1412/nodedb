const mongoose = require("mongoose");
 const { Schema } = mongoose;

// Article Schema
let articleSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});

let Article = module.exports = mongoose.model('Article', articleSchema)
var mongoose = require("mongoose");

// refer to the Schema constructor
var Schema = mongoose.Schema;

// create a new UserSchema object
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  // note is an object that stores a Note id
  comments: [
    {  
    type: Schema.Types.ObjectId,
    ref: "Comment"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
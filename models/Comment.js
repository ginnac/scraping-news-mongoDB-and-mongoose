var mongoose = require("mongoose");

// refer to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NotesSchema object
var CommentSchema = new Schema({
  // `title` is of type String
  name: {
    type:String,
    required: true
  },
  // `body` is of type String
  body: {
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//create model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;
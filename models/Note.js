var mongoose = require("mongoose");

// refer to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NotesSchema object
var NoteSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});

//create model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
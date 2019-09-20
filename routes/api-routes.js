// Require all models
var db = require("../models");

module.exports = function(app) {

//when user submits comments then run post api route to let them create a new note

app.post("/articles/:id", function(req, res) {
    //
    // Create a new comment and pass the req.body to the entry
    db.Comment.create(req.body)
      .then(function(dbComment) {
        // If a comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
      })
      .then(function(dbComment) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbComment);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

//api to populate the comments from the corresponding video articles
app.get("/articles/:id", function(req, res) {
    console.log("scushuheu");
    db.Article.findOne({_id:req.params.id}).populate("comment").then(function(dbArticle){
      res.json(dbArticle)
    }).catch(function(err){
      res.json(err);
    });
  });

//api route to delete note
//api to update note




}
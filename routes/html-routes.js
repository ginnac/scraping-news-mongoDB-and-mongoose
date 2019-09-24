// Require all models
var db = require("../models");

module.exports = function(app) {

//then create route to get all data in mongo DB in handlebars listed

app.get("/", function(req, res) {
    db.Article.find({}).then(function(dbArticles) {
      var dataObject = {
        articles: dbArticles
      };
      //console.log(dataObject);
      res.render("index", dataObject);
    });
  });


  app.get("/saved", function(req, res) {
    db.Saved.find({}).populate("comments").then(function(dbSaved) {
      var dataObject = {
        articles: dbSaved
      };
      //console.log(dataObject);
      res.render("saved", dataObject);
    });
  });


}

//require the different packages needed
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

//module export since it is required in server.js

module.exports = function(app) {

    //go ahead and scrape using a get route
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.deseret.com/utah").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
  
            // Now, we grab every h2 within an article tag, and do the following:
            $("div.c-compact-river__entry div").each(function(i, element) {
            
        // Save an empty result object
        var result = {};
  
        // Add the text, src and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("div").children("h2").children("a").text();
        result.link = $(this)
          .children("div").children("h2").children("a").attr("href");
    
        //after scraping take the scraped data, post and store it in the database
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
        });
  
        // Send a message to the client
      res.send("Scrape Done");
    });
  });




};
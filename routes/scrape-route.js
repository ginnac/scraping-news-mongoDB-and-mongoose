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
        axios.get("https://www.foxbusiness.com/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
  
            // Now, we grab every h2 within an article tag, and do the following:
            $("article.video-ct").each(function(i, element) {
            
        // Save an empty result object
        var result = {};
  
        // Add the text, src and href of every link, and save them as properties of the result object
        result.title = $(this)
         .children("h3").children("a").text();
         result.body = $(this)
         .children("p").text();
         result.image = $(this)
          .children("div.m").children("a").children("img").attr("src");
        result.link = $(this)
          .children("div.m").children("a").attr("href");
    
        //after scraping take the scraped data,

            //lets find the article by title and if not saved in database then create
            db.Article.findOne({title:result.title}).then(function(dbArticle){
            
                //res.json(dbArticle);

            if(!dbArticle){
        
                
                db.Article.create(result)
                .then(function(dbCreatedArticle) {
                // View the added result in the console
                console.log("created new object: ")
                console.log(dbCreatedArticle);
                
                })
                .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
                });
                
            }
            
            }).catch(function(err){
                console.log(err);
            });
        
        //post and store it in the database
        // Create a new Article using the `result` object built from scraping
        
        });
  
        // Send a message to the client
      res.send("Scrape Done");
    });
  });




};
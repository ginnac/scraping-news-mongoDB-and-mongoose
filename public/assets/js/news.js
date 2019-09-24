//figure out if we have scraped in this session or not
//var y = sessionStorage.getItem("scraped?");
//dont display notes in home page
//$(".notes").hide();

$(document).on("click", "#scrape", function(event) {
event.preventDefault();


//if it wasnt scraped in this session, scrape and then reload page
    $.ajax({
        method: "GET",
        url: "/scrape"
      })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data); 
        //sessionStorage.setItem("scraped?", "yes");
        setTimeout(function(){location.reload()}, 2000);
        
    });

});

$(document).on("click", "#saveArticleBtn", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/api/save-article/" + id,
    data: {
      // Value taken from title input
      title: $("#title-" + id).text(),
      // Value taken from note textarea
      body: $("#body-" + id).text(),
      image: $("#img-" + id).attr("src"),
      link: $("#link-" + id).attr("href")
    }
  })
    // With that done
    .then(function(data) {
      console.log(data)
    });

});


//when clicking on clear:
$(document).on("click", "#clear", function(event) {
  event.preventDefault();
  $.ajax({
    method: "DELETE",
    url: "/api/all-articles"
  })
    // With that done
    .then(function(data) {
        console.log(data);
        window.location.href="/";
    });
});

//when clicking on save article: 


$(document).on("click", "#scrape", function(event) {
  event.preventDefault();
  
  
  //if it wasnt scraped in this session, scrape and then reload page
      $.ajax({
          method: "GET",
          url: "/scrape"
        })
          // With that done, add the note information to the page
          .then(function(data) {
              console.log(data); 
          //sessionStorage.setItem("scraped?", "yes");
          setTimeout(function(){location.reload()}, 2000);
          
      });
  
  });

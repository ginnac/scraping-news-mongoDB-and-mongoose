//figure out if we have scraped in this session or not
var y = sessionStorage.getItem("scraped?");

//hide class
$(".changeable-div").hide();

//if it was scraped in this session do not scrape again
if(y){
   console.log("doesnt need to scrape")
}
//if it wasnt scraped in this session, scrape and then reload page
else{
    $.ajax({
        method: "GET",
        url: "/scrape"
      })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data); 
        sessionStorage.setItem("scraped?", "yes");
        setTimeout(function(){location.reload()}, 2000);
        
    });
}

$(document).on("click", "#saveBtn", function(event) {
    event.preventDefault();
   
    var id = $(this).attr("data-id");
    
    $.ajax({
        method: "POST",
        url: "/api/articles/" + id,
        data: {
          // Value taken from title input
          name: $("#note-title-" + id).val().trim(),
          // Value taken from note textarea
          body: $("#note-body-" + id).val().trim()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Also, remove the values entered in the input and textarea for note entry
          $("#note-title-" + id).val("");
          $("#note-body-" + id ).val("");

            var articleId = data._id;
            console.log(articleId);

          $.ajax({
            method: "GET",
            url: "/api/articles/" + articleId
          })
            // With that done, add the note information to the page
            .then(function(data) {
              console.log(data);
              //show the div
              $(".changeable-div").show();
              var div = $("<div>");
              var index = data.comments.length - 1;
              // add name and body
              div.append("<p>"+data.comments[index].name + " said: "+data.comments[index].body +
              "   <button data-id='" + data.comments._id + "' id='deleteBtn'>Delete Comment</button> </p>");
             
              // A textarea to add a new note body
              $("#comments-left-" + articleId).append(div);
              // A button to submit a new note, with the id of the article saved to it

              setTimeout(function(){location.reload()}, 1000);
            });
         
        });
    
     
      

});


//when clicking on delete button

$(document).on("click", "#deleteBtn", function(event) {
    event.preventDefault();
   
    var id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: "/api/article/" + id
      })
        // With that done
        .then(function(data) {
            console.log(data);
            setTimeout(function(){location.reload()}, 1000); 
        });
    });
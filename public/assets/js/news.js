//figure out if we have scraped in this session or not
var y = sessionStorage.getItem("scraped?");

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

$("#saveBtn").off().on("click", function(event){
    event.preventDefault();
    var id = $("#saveBtn").attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
          // Value taken from title input
          name: $("#note-title").val().trim(),
          // Value taken from note textarea
          body: $("#note-body").val().trim()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Also, remove the values entered in the input and textarea for note entry
          $("#note-title").val("");
          $("#note-body").val("");

            var articleId = data._id;
            console.log(articleId);

          $.ajax({
            method: "GET",
            url: "/articles/" + articleId
          })
            // With that done, add the note information to the page
            .then(function(data) {
              console.log(data);
              var div = $("<div>");
              // The title of the article
              div.append("<p>by: " + data.comment.name + "</p>");
              // An input to enter a new title
              div.append("<p>" + data.comment.body + "</p>");
              // A textarea to add a new note body
              $("#comments-left").append(div);
              // A button to submit a new note, with the id of the article saved to it
              div.append("<button data-id='" + data.comment._id + "' id='deleteBtn'>Delete Comment</button>");
        
              // If there's a note in the article
            //   if (data.note) {
            //     // Place the title of the note in the title input
            //     $("#titleinput").val(data.note.title);
            //     // Place the body of the note in the body textarea
            //     $("#bodyinput").val(data.note.body);
            //  }
            });
         
        });
    
     
      

});
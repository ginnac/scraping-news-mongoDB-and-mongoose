$(".changeable-div").hide();
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

              var div = $("<div>");
              var index = data.comments.length - 1;
              // add name and body
              div.append("<p>"+data.comments[index].name + " said: "+data.comments[index].body +
              "   <button data-id='" + data.comments._id + "' id='deleteBtn'>Delete Comment</button> </p>");
              //$(".changeable-div").show();
              // A textarea to add a new note body
              $("#comments-left-" + articleId).append(div);
              // A button to submit a new note, with the id of the article saved to it
            
            }).then(function(){
                location.reload();
            })
         
        });
    
     
      

});


//when clicking on delete button

$(document).on("click", "#deleteBtn", function(event) {
    event.preventDefault();
   
    var id = $(this).attr("data-id");
    $(this).parent().parent().hide();
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


//when clicking on clear-saved:
$(document).on("click", "#clear-saved", function(event) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/api/all-saved-articles"
    })
      // With that done
      .then(function(data) {
          console.log(data);
          window.location.href="/saved";
      });
  });
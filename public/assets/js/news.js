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
        setTimeout(function(){location.reload();}, 5000);
        
    });
}
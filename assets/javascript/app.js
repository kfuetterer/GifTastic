window.onload = function () {

var topics = ["monkeys", "dogs", "cats", "alligators", "turtles", "bunnies"];

function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
    $(".animals").on("click", function() {
	    $.ajax({
	        url: queryURL,
	        method: "GET"
	    }).done(function(response) {
	        var results = response.data;
	        for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item'>");
	            var rating = results[i].rating;
	            var p = $("<p>").text("Rating: " + rating);
	            var animalImage = $("<img>");
	            animalImage.attr("src", results[i].images.fixed_height_still.url);
	            $("#gifs-appear-here").prepend(gifDiv);
	            gifDiv.prepend(p);
	            gifDiv.prepend(animalImage); 
	        }
	    });
	});
}

function renderButtons() {
    $("#buttons-view").empty();
      
    for (var i = 0; i < topics.length; i++) {
    	console.log(topics[i]);
        var a = $("<button>");
        a.addClass("animals");
        a.addClass("btn btn-secondary");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var animal = $("#topicInput").val().trim();
    topics.push(animal);
    renderButtons();
});

$(document).on("click", ".animals", displayGif);
renderButtons();

}

//Your app should take the topics in this array and create buttons in your HTML.
//Try using a loop that appends a button for each string in the array.
//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
//Under every gif, display its rating (PG, G, so on).
//This data is provided by the GIPHY API.
//Only once you get images displaying with button presses should you move on to the next step.
//Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

window.onload = function () {

//creating an array of animals, later will push new button names to this array
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
				//getting the results of rating for each gif result and storing it in the variable rating
	            var rating = results[i].rating;
				//creating a paragraph tag with the rating inside
	            var p = $("<p>").text("Rating: " + rating);
				//creating an animalImage variable with an image tag. All gifs will be stored in this variable
	            var animalImage = $("<img>");
				//adding the attribute source and it's source url to the image tag
	            animalImage.attr("src", results[i].images.fixed_height_still.url);
				//adding the attribute data-animate with the url for the animated gif
				animalImage.attr("data-animate", results[i].images.fixed_height.url);
				//adding the attribute data-still with the url for the still gif
				animalImage.attr("data-still", results[i].images.fixed_height_still.url);
				//adding the attribute data-state that lets us know if the gif is still or animated
				animalImage.attr("data-state", "still");
				//prepending the animalImage to the id "gifs-appear-here" in the index.html file
	            $("#gifs-appear-here").prepend(animalImage);
				//prepending the paragraph tag to the id "gifs-appear-here" in the index.html file
	            $("#gifs-appear-here").append(p);
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

$("#gifs-appear-here").on("click", "img", function(event) {

	//if the data-state attribute of img equals to "still", therefore it is still
	if ($(this).attr("data-state") === "still") {
		//then find the source tag of img and replace it with the source in data-animate, ie make it animate
		$(this).attr("src", $(this).attr("data-animate"));
		//change the data-state to animate
		$(this).attr("data-state", "animate");
	}
	
	//if the data-state attribute of img equals to "animate", therefore it is animated
	if ($(this).attr("data-state") === "animate") {
		//then find the source tag of img and replace it with the source in data-still, ie make it still
		$(this).attr("src", $(this).attr("data-still"));
		//change the data-state to still
		$(this).attr("data-state", "still");
	}
});

//everytime a button is clicked with the class animals run the function displayGif, ie display the ten gifs
$(document).on("click", ".animals", displayGif);
renderButtons();

}

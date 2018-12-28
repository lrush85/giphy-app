
$(document).ready(function() {



    var topics = ["michael jordan", "micheal scott", "patrick swayze", "superman", "batman", "pam halpert"];
    


    function displayGiphyInfo () {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lUSK1fPW7gLS0BbQoVE7ZsfLOk0e3tja&q=" + topic + "&limit=5&offset=0&rating=G&lang=en";

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            result = response.data;
            
                for(var i = 0; i < result.length; i++) {
                    var topicDiv = $("<div class='topic-div col-md-4 col-sm-6'>");
                    // Set up rating and holder of that rating.
                    var rating = result[i].rating;

                    // Image animate set up
                    var imageAnimate = result[i].images.fixed_height.url;
                    
                    // Image still set up
                    var imageStill = result[i].images.fixed_height_still.url;

                    // Image set up
                    
                    var imageGif = $("<img>");
                    var p = $("<p>").text("Rating: " + rating);
                    
                    imageGif.attr("src", imageStill);
                    imageGif.addClass("gif");
                    imageGif.attr("data-state", "still");
                    imageGif.attr("data-still", imageStill);
                    imageGif.attr("data-animate", imageAnimate);

                    topicDiv.append(imageGif);
                    topicDiv.append(p);
                    $("#gifs").prepend(topicDiv);
                    
                }

        });
        
    }

    function showButtons () {

        // Deletes the movie prior to adding ones.
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            
            
            var topicButton = $("<button>");
            topicButton.addClass("topic btn col-md-2");
            topicButton.attr("data-name", topics[i]);
            topicButton.text(topics[i]);
            $("#buttons-view").append(topicButton);

            
        }
        
    }

    $("#add-topic").on("click", function(event){
        
        event.preventDefault();

        var topic = $("#topic-input").val().trim();
        $("#topic-input").val("");
        topics.push(topic);

        showButtons();
    });

    $(document).on("click", ".topic", displayGiphyInfo);
    $(document).on("click", ".gif", pauseGif);
    
    showButtons();

    function pauseGif() {
        var state = $(this).attr("data-state");

        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
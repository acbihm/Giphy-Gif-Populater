// var topics = ["KITTY", "TURTLE", "OWL", "FROG", "DOGGY", "CRAB", "SNAKE"];

// // Function for displaying movie data
// function renderButtons() {
//     $('#animals-list').empty();
//     //do this instead of .text('') like i used to.
//     for (i = 0; i < topics.length; i++) {
//         $('#animals-list').append('<button value="' + topics[i] + '"> ' + topics[i] + '</button>')
//     }
// }

// // This function handles events where one button is clicked
// $("#animal-input").on("click", function (event) {
//     event.preventDefault();
//     var animal = $('#animal-input').val().toUpperCase();
//     topics.push(animal);
//     renderButtons();  //onclick

// });
// //displays the initial buttons (none of the user-created ones)
// renderButtons();

var animals = [];
if (localStorage.getItem('animals')) {
    animals = JSON.parse(localStorage.getItem('animals'));
}

//  On Click event associated with the input-animal function
$("#submit-animal").on("click", function (event) {
    event.preventDefault();
        // Get the to-do "value" from the textbox and store it a variable
    var newAnimal = $("#input-animal").val().trim();
    animal.push(newAnimal);          //ADDS IT TO SESSION ARRAY
    localStorage.setItem('animals', JSON.stringify(animals));
                                    //ABOVE: ADDS STRINGIFIED SESSION ARR TO 
                                    //LOCAL STORAGE. 
                                    //THEN RENDERTODOS WILL CLEAR ALL 
                                    // SESSION INFO, AND RE-RENDER, PULLING FROM
                                    // THE LOCALSTORAGE.
    renderAll();
        // BELOW: Clear the textbox when done
    $("#input-animal").val("");
});




























$(function () {                     //the sidebar that follows the user
    var $sidebar = $("#sidebar"),
        $window = $(window),
        offset = $sidebar.offset(),
        topPadding = 15;

    $window.scroll(function () {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });

});
// ======================================================


// $("button").on("click", function () {
//     renderButtons();
//     // Grabbing and storing the data-animal property value from the button
//     var animalName = $(this).attr("value");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         animalName + "&api_key=ZB6vh2ekQvch03fVrJAsL79ido5bUdbo";

// console.log(queryURL);
//     // Performing an AJAX request with the queryURL
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         // After data comes back from the request
//         .then(function (response) {
//             console.log(queryURL);

//             console.log(response);
//             // storing the data from the AJAX request in the results variable
//             var results = response.data;
//             for (var i = 0; i <= 10; i++) {

//                 // Creating and storing a div tag
//                 var animalDiv = $("<div>");

//                 // Creating a paragraph tag with the result item's rating
//                 var p = $("<p>").text("Rating: " + results[i].rating);

//                 // Creating and storing an image tag
//                 var animalImage = $("<img>");
//                 // Setting the src attribute of the image to a property pulled off the result item
//                 animalImage.attr("src", results[i].images.fixed_height.url);

//                 // Appending the paragraph and image tag to the animalDiv
//                 animalDiv.append(p);
//                 animalDiv.append(animalImage);

//                 // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//                 $("#dump").prepend(animalDiv);
//             }
//         });
// });
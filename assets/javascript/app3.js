
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

// ===============================================================

var animals = [];
if (localStorage.getItem('animals')) {
    animals = JSON.parse(localStorage.getItem('animals'));
}

$("#submit-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $('#animal-input').val().trim().toUpperCase();
    $(this).attr('data-animal', animal)
    // animal.attr('data-animal', animal)

    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    renderButton(animal);
    $("#animal-input").val("");

});

function renderButton(animal) {
    // $('#animals-list').empty();
    var newBtn = $('<span>').addClass('animalList');
    var animalBtn = $("<button>").text(animal).attr('data-animal', animal);
    animalBtn.attr("id", 'nameOf' + animal).addClass('btn btn-primary addedAnimal');
    animalBtn.attr("id", 'nameOf' + animal).addClass('btn btn-primary');
    animalX = $('<span>').html('&times;&nbsp;&nbsp;').addClass('exit').attr('data-animal', animal);
    // animalX = $('<span>').html('&nbsp;&times;').attr('id', 'exit-' + animal);

    newBtn.append(animalBtn).append(animalX);
    $("#animals-list").append(newBtn);
}

function renderList() {

    $('#animals-list').empty();
    // $('#dump').empty();
    animals.forEach(renderButton);
}
renderList();

function dumpGif(results, i) {
    var animalDiv = $('<div>');
    var rating = $('<h3>').addClass('rate');
    rating.text('Rating: ' + results[i].rating);
    var animalImage = $('<img>');
    animalImage.attr('data-state', 'still');
    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
    animalImage.attr('data-animated', results[i].images.fixed_height.url);
    animalImage.attr('src', results[i].images.fixed_height_still.url);
    animalImage.addClass('gif');
    var ratingP = $('<div class="rate"><h3>RATING: </h3><h2>' + results[i].rating.toUpperCase() + '</h2></div>');
    animalDiv.append(animalImage, ratingP);
    $('#dump').prepend(animalDiv);
}

$(".gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // alert(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$(".addedAnimal").on("click", function (animal) {
    var queryAnimal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        queryAnimal + "&api_key=ZB6vh2ekQvch03fVrJAsL79ido5bUdbo&limit10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i <= 9; i++) {
            dumpGif(results, i);
            // var animalDiv = $('<div>');
            // var rating = $('<h3>').addClass('rate');
            // rating.text('Rating: ' + results[i].rating);
            // var animalImage = $('<img>');
            // animalImage.attr('src', results[i].images.fixed_height.url);
            // var ratingP = $('<div class="rate"><h3>RATING: </h3><h2>' + results[i].rating.toUpperCase() + '</h2></div>');
            // animalDiv.append(animalImage, ratingP);
            // $('#dump').prepend(animalDiv);
        }
    });
});

// $('#deleteBtns').on("click", function () {
//     localStorage.removeItem('animals', JSON.stringify(animals));
//     // $('.animalList').empty();
//     renderList();
// });



$(".exit").on("click", function () {
    //this removes it from the DOM
    var removeThis = $(this).attr('data-animal');
    $('#nameOf' + removeThis).remove();
    $(this).remove();
    

});

$(document.body).on("load", ".btn .gif .addedAnimal", function () {
    localStorage.setItem('animals', JSON.stringify(animals));
    renderList();
});

















// ======================================================


// $("button").on("click", function () {
//     
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
var movie = "dazed and confused";
var movieYear = ""
var imdbSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_7ln5s4c3/" + movie + "" + movieYear;

$.ajax({
    url: imdbSearchURL,
    method: 'GET'
}).then(function(response) {
console.log(response);
var movieInfo = {
    title: response.results[0].title,
    year: response.results[0].description,
    poster: response.results[0].image,
    id: response.results[0].id
}
var imdbFullCastSearchURL = "https://imdb-api.com/en/API/FullCast/k_7ln5s4c3/" + movieInfo.id;
$.ajax({
    url: imdbFullCastSearchURL,
    method: "GET"
}).then(function(response){
    console.log(response);
var soundtrackInfo = {
    composer: response.others[1].items[0].name
}
    console.log(movieInfo);
$('#movie-poster').attr('src', movieInfo.poster);
$('body').append("<h1>Composer: " + soundtrackInfo.composer);

});



});
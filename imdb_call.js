var movie = "cats";
var movieYear = "2019"
var imdbSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_7ln5s4c3/" + movie + "" + movieYear;

$.ajax({
    url: imdbSearchURL,
    method: 'GET'
}).then(function(response) {
console.log(response);
var movieInfo = {
    title: response.results[0].title,
    poster: response.results[0].image,
    id: response.results[0].id
}
var imdbFullActorSearchURL = "https://imdb-api.com/en/API/Title/k_7ln5s4c3/" + movieInfo.id + "/FullActor,FullCast";
$.ajax({
    url: imdbFullActorSearchURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    var castAndCrewInfo = {
        stars: response.stars,
        director: response.directors,
        composer: response.fullCast.others[1].items[0].name,
        year: response.year
    }

    console.log(movieInfo);
$('#movie-poster').attr('src', movieInfo.poster);
$('.movie-info').append('<ul><li><h3>' + movieInfo.title + '</h3></li><li>Release Year: ' + castAndCrewInfo.year + '</li><li>Music by: ' + castAndCrewInfo.composer + '</li><li>Starring: ' + castAndCrewInfo.stars + '</li><li>Directed by: ' + castAndCrewInfo.director + '</li></ul>')


});

});

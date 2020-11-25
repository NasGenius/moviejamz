var movie = "cats";
var movieYear = "2019"
var imdbSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_7ln5s4c3/" + movie + "" + movieYear;

$.ajax({//First ajax call just gets the basic movie info like the official title, the poster, and it's IMDB id
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
$.ajax({ //Second ajax call gets additional movie info to be used to add more items to search within itunes
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


var limitOfSearchResults = 5;
var soundtrackURL = 'https://itunes.apple.com/search?media=music&term=' + movieInfo.title + '+motion+picture+soundtrack&limit=' + limitOfSearchResults + '&entity=album&attribute=albumTerm';
//var composerURL = 
//var actorsURL =

console.log(soundtrackURL);

$.ajax({//third ajax call returns any albums related to the movie along with soundtrack info
    url: soundtrackURL,
    method: 'GET'
}).then(function(response){
    var formattedResponse = JSON.parse(response);
    for (i = 0; i < 5; i++) {
        console.log(formattedResponse.results[i]);
        var genre = formattedResponse.results[i].primaryGenreName;
        var albumRelease = formattedResponse.results[i].releaseDate;
        var albumYear = albumRelease.substr(0,4);
        console.log(albumYear);
        if (genre === "Soundtrack" && albumYear == castAndCrewInfo.year) {
            var soundtrackInfo = {
            albumName: formattedResponse.results[i].collectionName,
            albumID: formattedResponse.results[i].collectionId,
            albumURL: formattedResponse.results[i].collectionViewUrl,
            };
            i = 5;
            console.log(soundtrackInfo);

        }
    }

    /* if (genre = "Soundtrack") { *
        var formattedResponse = JSON.parse(response);
        console.log(formattedResponse);
        console.log(typeof formattedResponse);
/*    } else */
    
    //var soundtrackInfo = {

    });

});

});

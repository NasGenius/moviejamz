var movie = "moulin rouge";
var movieYear = ""
var imdbSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_7ln5s4c3/" + movie + " " + movieYear;

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
    $('#movie-content').attr('style','display: initial;');
$('#movie-poster').attr('src', movieInfo.poster).attr('alt','Movie poster for' + movieInfo.title + '.');
$('#release-year').text(castAndCrewInfo.year);
$('#movie-title').text(movieInfo.title);
$('#composer').text(castAndCrewInfo.composer);
$('#starring').text(castAndCrewInfo.stars);
$('#director').text(castAndCrewInfo.director);




var limitOfSearchResults = 5;
/* var movieTitleEncoded = encodeURIComponent(movieInfo.title);
var movieTitleWithPlus = movieInfo.title.replace(/%20/g,"+");
console.log(movieTitleEncoded);
console.log(movieTitleWithPlus); */
var soundtrackURL = 'https://itunes.apple.com/search?media=music&term=' + movieInfo.title + '+motion+picture+soundtrack&limit=' + limitOfSearchResults + '&entity=album&attribute=albumTerm';
var encodedSoundtrackURL = encodeURI(soundtrackURL);
var soundTrackURLWithPlus = encodedSoundtrackURL.replace(/%20/g,"+");
console.log(soundTrackURLWithPlus);
//var composerURL = 
//var actorsURL =


$.ajax({//third ajax call returns any albums related to the movie along with soundtrack info
    url: soundTrackURLWithPlus,
    method: 'GET'
}).then(function(response){
    console.log(response);
    var formattedResponse = JSON.parse(response);
    if (formattedResponse.resultCount == 0) {
        console.log("No results found");
    } else {
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
            var tracklistURL = 'https://itunes.apple.com/lookup?id=' + soundtrackInfo.albumID + '&entity=song'
            $.ajax({
                url: tracklistURL,
                method: "GET"
            }).then(function(response){
                var formattedTracklistResponse = JSON.parse(response);
                console.log(formattedTracklistResponse);
                $('#soundtrack').append('<div class="notification is-dark"><h3 class="has-text-weight-bold is-size-4">Soundtrack Title:</h3><p class="is-size-4">' + soundtrackInfo.albumName + '</p></div><div class="notification is-dark"><div class="content"><p><b>Tracklist</b> | Click the link to access Apple Music</p><ol type="1" id="tracklist"></ol></div></div>')
                for (i = 1; i < formattedTracklistResponse.results[0].trackCount; i++) {
                    var track = {
                        trackNumber: formattedTracklistResponse.results[i].trackNumber,
                        trackName: formattedTracklistResponse.results[i].trackName,
                        trackURL: formattedTracklistResponse.results[i].trackViewUrl
                    };
                    console.log(track);
                    $('#tracklist').append('<li><a href="' + track.trackURL + '" target="_blank">' + track.trackName + '</a></li>')
                }
            })


        }
    }
}

    });

});

});

var searchBar = $('#searchBar');
var searchBtn = $('#searchBtn');
var directorDiv = $('#movie-directors')
var starsDiv = $('#movie-stars')
var infoDiv = $('#movie-info')


searchBar[0].addEventListener('keyup', function(searchString) {
    return searchBar = searchString.target.value;
      
}); 


searchBtn.click(function(){

    
    $.ajax({
        url: "https://imdb-api.com/en/API/SearchMovie/k_7ln5s4c3/" + searchBar,
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
    
        
    $('#movie-poster').attr('src', movieInfo.poster);
    $('#movie-title').text(movieInfo.title);
    $('#movie-info').text("Composer: " + castAndCrewInfo.composer)
    $('#movie-stars').text("Cast: " + castAndCrewInfo.stars)
    $('#movie-directors').text("Director: " + castAndCrewInfo.director)
    $('.movie-info').append('<ul><li><h3>' + movieInfo.title + '</h3></li><li>Release Year: ' + castAndCrewInfo.year + '</li><li>Music by: ' + castAndCrewInfo.composer + '</li><li>Starring: ' + castAndCrewInfo.stars + '</li><li>Directed by: ' + castAndCrewInfo.director + '</li></ul>')
    

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
                $('#tracklist').append('<div class="notification is-dark songresult"><b>Soundtrack Title:</b> ' + soundtrackInfo.albumName + '</div>')
                for (i = 1; i < formattedTracklistResponse.results[0].trackCount; i++) {
                    var track = {
                        trackNumber: formattedTracklistResponse.results[i].trackNumber,
                        trackName: formattedTracklistResponse.results[i].trackName,
                        trackURL: formattedTracklistResponse.results[i].trackViewUrl
                    };
                    console.log(track);
                    $('#tracklist').append('<div class="notification is-dark songresult" id="song1">' + track.trackNumber + '. <a href="' + track.trackURL + '" target="_blank">' + track.trackName + '</a></div>')
                }
            })

        }
    }
}
    });
});
});
    
    });


    
    



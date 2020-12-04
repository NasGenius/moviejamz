
// function for imdb api call

    var currentYear = moment().format('YYYY');
    console.log(currentYear);
    for (i = 1895; i <= currentYear; i++) {
        $('#movie-year').append('<option>' + i + '</option>');
    }



/* searchBar[0].addEventListener('keyup', function(searchString) {
    return searchBar = searchString.target.value;
      
});  */




function movieSearch() {

$('#soundtrack').empty();    

var movie = $('#searchBar').val();
var movieYear = $('select').val();

if (movieYear == 'Select Year (optional)') {

    

    var movieSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_dd9jqywu/" + encodeURIComponent(movie);

} else {
    var movieSearchURL = "https://imdb-api.com/en/API/SearchMovie/k_dd9jqywu/" + encodeURIComponent(movie) + '%20' + movieYear;

};
    
console.log(movieSearchURL);
    $.ajax({
        url: movieSearchURL,
        method: 'GET'
    }).then(function(response) {
    console.log(response);
    if (response.results.length === 0) {
        $('#movie-content').append('<div class="columns"><div class="column"><div class="notification"><div class="notification"><p>No results could be found.</p></div></div></div>');
    } else {
    var movieInfo = {
        title: response.results[0].title,
        poster: response.results[0].image,
        id: response.results[0].id
  
    }
    var imdbFullActorSearchURL = "https://imdb-api.com/en/API/Title/k_dd9jqywu/" + movieInfo.id + "/FullActor,FullCast";


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
        $('#movie-content').attr('style','display: initial;');
        $('#movie-poster').attr('src', movieInfo.poster);
        $('#movie-title').text(movieInfo.title);
        $('#release-year').text(castAndCrewInfo.year);
        $('#composer').text(castAndCrewInfo.composer);
        $('#starring').text(castAndCrewInfo.stars);
        $('#director').text(castAndCrewInfo.director);
    

//Need to remove special characters from the title returned from imdb to prevent issues with the itunes search

var movieTitleWithoutColon = movieInfo.title.replace(/:/g,"");
var movieTitleWithoutHyphen = movieTitleWithoutColon.replace(/-/g,"");
var movieTitleEncoded = encodeURIComponent(movieTitleWithoutHyphen);
var movieTitleWithPlus = movieTitleEncoded.replace(/%20/g,"+");
console.log(movieTitleEncoded);
console.log(movieTitleWithPlus);
var soundtrackURL = 'https://itunes.apple.com/search?term=' + movieTitleWithPlus + '+soundtrack';
 
console.log(soundtrackURL);

$.ajax({ //third ajax call returns any albums related to the movie along with soundtrack info
    url: soundtrackURL,
    method: 'GET'
}).then(function(response){
    console.log(response);
    var formattedResponse = JSON.parse(response);
    if (formattedResponse.resultCount == 0) {
        console.log("No results found");
        $('#soundtrack').append('<div class="notification is-dark"><p class="is-size-4">No soundtrack could be found.</p></div>');
    } else {
    for (i = 0; i < formattedResponse.resultCount; i++) {
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
            i = formattedResponse.resultCount;
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

                    $('#tracklist').append('<li class="track" ><p><a href="' + track.trackURL + '" target="_blank">' + track.trackName + '</a></p></li>')
                

                    
                
            

                
                }
            })


        } 

    }
}



});


    });



    }

});

}


//Event listener to start the search
var trackList = $('#saved-songs')
$('#searchBtn').on('click', function() {

    //stores users input and appends to search history
    var key = 'movietitle';
    var value = $('#searchBar').val();

    if (key && value) {
        localStorage.setItem(key, value)
        
    }

    for (var i = 0; i <localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key)
    
        trackList.append(`<a href=""> ${value} </a>`) 
    }
    
    movieSearch();
});

for (var i = 0; i <localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key)

    trackList.append(`<a href=""> ${value} </a>`) 
}





//Code to save and store songs

// function saveSong(event) {
//     event.preventDefault()
//     var savedSongs = $('#saved-songs');
//     savedSongs.append($('#track-name').text());
//     localStorage.setItem = ('savedSongs', JSON.stringify(savedSongs));
// }

// $('document').on('click', {
//     trackURL: $(this).siblings().attr('href'),
//     trackName: $(this).siblings().text()
// }, saveSong);





//Event listener to start the search

$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    movieSearch();
});

/////////////////////////////////////////////////


//Code to save and store songs

/* function log() {
    console.log('test');
}

function saveSong(event) {
    event.preventDefault();
    var savedSongs = $('#saved-songs');
    savedSongs.append('<a href="' + event.data.trackURL + '" class="navbar-item" target="_blank">' + event.data.trackName + '</a>');
    localStorage.setItem = ('savedSongs', JSON.stringify(savedSongs));
}

$(document).on('click', {
    trackURL: $(this).siblings().attr('href'),
    trackName: $(this).siblings().text()
}, saveSong); */


                       /*  
                    }, saveSong); */

/* $('.button is-small').click(function(event){
    event.preventDefault();
    var storedTrack = {
        trackURL: $(this).siblings().attr('href'),
        trackName: $(this).siblings().text()
    }
    $('#saved-songs').append('<a href="' + storedTrack.trackURL + '" class="navbar-item" target="_blank">' + storedTrack.trackName + '</a>')
})
 */


    

//////////////////////////////////////////


/* $(document).on('click', '.track', function() {
    var saveTitle = $(this).siblings().text();
    var saveURL = $(this).siblings().attr('href');
    console.log(saveTitle);
    console.log(saveURL);
    $('#saved-songs').append('<a href="' + saveURL + '" class="navbar-item" target="_blank">' + saveTitle + '</a>')
}); */

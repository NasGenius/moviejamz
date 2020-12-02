var searchBar = $('#searchBar');
var searchBtn = $('#searchBtn');
var addSongBtn = $('.button')
var moviePosterdiv = $('#movie-poster');
var infoColumn = $('#info-column');
var songColumn = $('#song-column');
var songName = $('<p>');
var savedTrack = $('#saved-track');

$(document).ready(function hide() {
    moviePosterdiv.hide()
    infoColumn.hide()
    songColumn.hide()
})

function show() { 
    moviePosterdiv.show(); 
    infoColumn.show();
    songColumn.show();
} 


searchBar[0].addEventListener('keyup', function(searchString) {
    return searchBar = searchString.target.value;
      
}); 


function imdbSearch(){

    
    $.ajax({
        url: "https://imdb-api.com/en/API/SearchMovie/k_rsrs59e1/" + searchBar,
        method: 'GET'
    }).then(function(response) {
    console.log(response);
    var movieInfo = {
        title: response.results[0].title,
        poster: response.results[0].image,
        id: response.results[0].id
    }
    var imdbFullActorSearchURL = "https://imdb-api.com/en/API/Title/k_rsrs59e1/" + movieInfo.id + "/FullActor,FullCast";
    $.ajax({
        url: imdbFullActorSearchURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var castAndCrewInfo = {
            stars: response.stars,
            director: response.directors,
            composer: response.fullCast.others[1].items[0].name,
            year: response.year,
            plot: response.plot
        }
    
        console.log(movieInfo);
    $('#movie-poster').attr('src', movieInfo.poster);
    $('#movie-title').text(movieInfo.title);
    $('#composer').text(castAndCrewInfo.composer);
    $('#starring').text(castAndCrewInfo.stars);
    $('#director').text(castAndCrewInfo.director);
    $('#plot').text(castAndCrewInfo.plot);
    $('.movie-info').append('<ul><li><h3>' + movieInfo.title + '</h3></li><li>Release Year: ' + castAndCrewInfo.year + '</li><li>Music by: ' + castAndCrewInfo.composer + '</li><li>Starring: ' + castAndCrewInfo.stars + '</li><li>Directed by: ' + castAndCrewInfo.director + '</li></ul>')
    
    
    });
    
    });
    
}

function itunesSearch() {

}

searchBtn.click(imdbSearch).click(itunesSearch).click(show);
addSongBtn.click(saveSong).click(getSong)


function saveSong() {
    window.localStorage.setItem('savedsong', songName)
}

function getSong() {
    savedTrack.text(window.localStorage.getItem('savedsong'))
}


 



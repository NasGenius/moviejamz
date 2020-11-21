var movieSoundtrack = "";
var soundtrackYear = "";
var iTunesSearchURL = "https://itunes.apple.com/search?parameterkeyvalue";

$.ajax({
    url: iTunesSearchURL,
    method: 'GET'
    keyvalue=1234567890
}).then(function(response) {
console.log(response);
var soundtrackInfo = {
    title: response.results[0].title,
    year: response.results[0].description,
    poster: response.results[0].image,
    id: response.results[0].id
}

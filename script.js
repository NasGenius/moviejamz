$(document).ready(function() {
  $('#search').click(function() {
      
            var media = "music";  
            var limitOfSearchResults = 1;  
            var thing = document.getElementById('itunesSearch').value;
            var whatosearch = $('#itunesSearch').attr('value'); 

            $.getJSON("http://itunes.apple.com/search?term=" + thing   
                        + "&country=us&limit=" + limitOfSearchResults   
                        + "&media=" + media
                        + "&callback=?",function(data) {  

                songname = data["results"][0].trackName;
                resultPlaylist = createPlaylist(song);
                alert(resultPlaylist); 

                });
          function createPlaylist(song){
           var playlist = new Array ();
           playlist.push(song);
           return playlist.length; 

          )};
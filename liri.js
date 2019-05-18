require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var title = "";
var doThis = process.argv[2];

function getTitle(){
    var nextThing = "";
    if (process.argv.length<4){
        nextThing = "default";
    }
    else{
        nextThing = process.argv[3];
        if (process.argv.length>4){
            for (i=4; i<process.argv.length; i++){
                nextThing = nextThing + " " + process.argv[i]; 
            }
        }
    }
    direction(nextThing);
}

function direction(userQuery){
    switch (doThis){
        case commands[0]:{
                useThis = userQuery;
                break;
            }
        case commands[1]:{
            if (userQuery === "default"){
                useThis = "The Sign"
            }
            else{
                useThis = userQuery;
            } 
            break;
        };
        case commands[2]:{
            if (userQuery === "default"){
                useThis = "Mr. Nobody";
            }
            else{
                useThis = userQuery;
            }
            break;
        };
        case commands[3]:{
            break;
        };
        case commands[4]:{
            useThis = "Just a moo";
        }
    };   
    commandPrompt(useThis);
} 


commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says', 'moo'];

function commandPrompt(title){
    switch (doThis) {
        case commands[0]:{
            axios.get("https://rest.bandsintown.com/artists/" + title + "/events?app_id=18982016-4489-49ce-9678-32dce1606300&date=upcoming").then(function(response) {
                for (var i = 0; i<response.data.length; i++){
                    console.log("Name of the Venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\nDate of Event: " + moment(response.data[i].datetime).format("MM-DD-YYYY"));
                    console.log('=================');
                }
            });
            break;
        }
        case commands[1]:{
            console.log(commands[1]);
                spotify.search({ type: 'track', query: title})
                .then(
                    function(response) {
                        if (title === 'The Sign'){
                            for (var i = 0; i<response.tracks.items.length; i++){
                                for (var j=0; j<response.tracks.items[i].artists.length; j++){
                                    if (response.tracks.items[i].artists[j].name === 'Ace of Base'){
                                        printSong(response.tracks.items[i]);
                                    }
                                }
                            }
                        }
                        else{
                        printSong(response.tracks.items[0]);
                        }
                })
                .catch(function(err) {
                console.log(err);
                });
            break;
        };
        case commands[2]:{
            axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
            console.log("Title of the movie: " + response.data.Title + "\nYear the movie came out: " + response.data.Year + "\nIMDB Rating of the movie: " + response.data.imdbRating + "\nRotten Tomatoes Rating of the movie: " + response.data.ratings + "\nCountry where the movie was Produced: " + response.data.Country + "\nLanguage of the movie: " + response.data.Language + "\nPlot of the movie: " + response.data.Plot + "\nActors in the movie: " + response.data.Actors);
  }
);
            break;
        }
        case commands[3]:{
            console.log(commands[3]);
            break;
        }
        case commands[4]:{
            console.log('You have no cows!');
            console.log(title);
            break;
        }
    }
}

function printSong(songObject){
    var artists = getArtists(songObject.artists);
    console.log('Artists: '+ artists + "\nSong's Name: " + songObject.name +'\nPreview Link from Spotify: ' + songObject.external_urls.spotify + '\nAlbum: ' + songObject.album.name);
}

function getArtists(artistArray){
    var artists=[];
    for (var i = 0; i<artistArray.length; i++){
        artists.push(artistArray[i].name);
    }
    return artists;
}

nextThing = getTitle();

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var nextThing = "";
function getTitle(){
    if (process.argv.length>3){
        for (i=3; i<process.argv.length; i++){
        nextThing = nextThing + process.argv[i] + " ";
        }
    }
    else{
        nextThing = process.argv[3];
        nextThing = nextThing;
    }
    nextThing = nextThing.trimEnd();
}

commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says', 'moo'];

function commandPrompt(title){
    var doThis = process.argv[2];
    switch (doThis) {
        case commands[0]:{
            if (process.argv.length<=3){
                title = "The";
            }
            axios.get("https://rest.bandsintown.com/artists/" + title + "/events?app_id=18982016-4489-49ce-9678-32dce1606300&date=upcoming").then(function(response) {
                for (var i = 0; i<response.data.length; i++){
                    console.log("Name of the Venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\nDate of Event: " + moment(response.data[i].datetime).format("MM-DD-YYYY"));
                }
            });
            break;
        }
        case commands[1]:{
            console.log(commands[1]);
            spotify.search({ type: 'track', query: title })
            .then(function(response) {
              console.log(response.tracks.items[0]);
            })
            .catch(function(err) {
              console.log(err);
            });
            break;
        };
        case commands[2]:{
            if (process.argv.length<=3){
                title = "Mr. Nobody";
            }
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
nextThing = getTitle();
commandPrompt(nextThing);
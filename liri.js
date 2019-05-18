require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var nextThing = "";
if (process.argv.length>3){
    for (i=3; i<process.argv.length; i++){
      nextThing = nextThing + " " + process.argv[i];
    }
  }
  else{
    nextThing = process.argv[3];
  }
commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says', 'moo'];

function commandPrompt(title){
    var doThis = process.argv[2];

    switch (doThis) {
        case commands[0]:{
            console.log(commands[0]);
            break;
        }
        case commands[1]:{
            console.log(commands[1]);
            break;
        }
        case commands[2]:{
            if (process.argv.length=3){
                title = "Mr. Nobody";
            }
            console.log(nextThing);
            //movie stuff
            console.log(commands[2]);
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
commandPrompt(nextThing);
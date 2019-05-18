require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
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
commands = ['concert-this', 'spotify-this-song', 'nextThing-this', 'do-what-it-says', 'moo'];

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
            console.log(commands[2]);
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
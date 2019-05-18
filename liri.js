require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

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
}
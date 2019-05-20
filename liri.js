require("dotenv").config();

var keys = require('./keys.js');
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var liriCommand = process.argv[2];
var artist = process.argv.slice(3).join(" ");
var divider = "\n========================================================================\n";



switch (liriCommand) {

    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    case "help":
        console.log(divider)
        console.log("Thanks For Using Liri Bot, Here Is A List Of Possible Commands \n")
        console.log("1) concert-this <Name Of Artist/Band> - This will show you all info for upcoming concerts for your entry.")
        console.log("2) spotify-this-song <enter your song of choice> - This bring you info for 5 of the top songs with your matching title. You will aslo be able to click a link to preview the song! ")
        console.log("3) movie-this <enter movie title> - This will give you information for your movie selection")
        console.log("4) do-what-it-says <enter> - This will give you a recommendation that you will love!")
        console.log(divider);
        break;

    default:
        console.log("Invalid Command");
        break;

}

function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data)

            //identify if statement
            if (artist) {


                for (var i = 0; i < response.data.length; i++) {
                    //formatting the date/time using moment.
                    //split the returned date and time and store each array index in a separate variable for calling.
                    var dateTime = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00A").split(" ");
                    var date = dateTime[0];
                    var time = dateTime[1];
                    // var resultInfo = "COUNTRY:" + response.data[i].venue.country + "\n" + "VENUE:" + response.data[i].venue.name + "\n" + "CITY:" + response.data[i].venue.city + "\n" + "(Latitude):" + response.data[i].venue.latitude + "(Longitude):" + response.data[i].venue.longitude + "\n" + "DATE:" + date + "\n" + "TIME:" + time;
                    //  console.log(resultInfo);
                    console.log(i + ")" + " Venue Concert Information");
                    console.log(divider);
                    console.log("COUNTRY: " + response.data[i].venue.country);
                    console.log("VENUE: " + response.data[i].venue.name);
                    console.log("CITY: " + response.data[i].venue.city);
                    console.log("LOCATION: " + "(Latitude): " + response.data[i].venue.latitude + "   (Longitude): " + response.data[i].venue.longitude);
                    // console.log(response.data[i].datetime);
                    console.log("DATE: " + date);
                    console.log("TIME: " + time);
                    console.log(divider);

                    fs.appendFile("log.txt", artist + divider, function (err) {
                        if (err) throw err;
                        // fs.appendFile()
                    })
                }


            }

            if (response.data.length < 1) {
                console.log("Could Not Find Band or Concert or No Upcoming Shows, Please Check Your Spelling and Try Again!");
            };

        });

};

function spotifyThisSong() {

    if (!artist) {

        spotify.search({ type: 'track', query: "Ace of Base Sign", limit: 5 })
            .then(function (response) {
                for (var i = 0; i < response.tracks.items.length; i++) {

                    console.log("\n");
                    console.log(i + " ) " + " Track Information ")
                    console.log("\n");


                    var artist = "";
                    for (var j = 0; j < response.tracks.items[i].album.artists.length; j++) {

                        artist = artist + response.tracks.items[i].album.artists[j].name + ", ";
                    }
                    console.log("Artists: " + artist);
                    console.log("Name: " + response.tracks.items[i].album.name);
                    console.log("Track: " + response.tracks.items[i].album.external_urls.spotify);
                    console.log("Album Name: " + response.tracks.items[i].album.name);
                }
            })
            .catch(function (err) {
                console.log("We are having some issues: " + err);
            });

    }
    else {
        spotify.search({ type: 'track', query: artist, limit: 5 })
            .then(function (response) {


                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log(divider);
                    console.log(i + " ) " + " Track Information")
                    console.log("\n")


                    var artist1 = "";


                    for (var j = 0; j < response.tracks.items[i].album.artists.length; j++) {

                        artist1 = artist1 + response.tracks.items[i].album.artists[j].name + ", ";



                    }

                    console.log("ARTIST: " + artist1);
                    console.log("NAME: " + response.tracks.items[i].album.name);
                    console.log("ALBUM: " + response.tracks.items[i].album.name);
                    console.log("TRACK: " + response.tracks.items[i].album.external_urls.spotify);

                }
            })
            .catch(function (err) {
                console.log("hmmm....we seem to be having some issues" + err);
            });

    }
}

function movieThis() {

    axios.get("http://www.omdbapi.com/?apikey=trilogy&" + "t=" + artist)
        .then(function (response) {

            if (artist) {
                console.log(divider)
                console.log(artist + " Info");
                console.log(divider);

                console.log("MOVIE TITLE: " + response.data.Title);
                console.log("YEAR RELEASED: " + response.data.Year);
                console.log("COUNTRY OF ORIGIN: " + response.data.Country);
                console.log("MOVIE LANGUAGE: " + response.data.Language);
                console.log("ACTORS: " + response.data.Actors);
                console.log("IMDB RATING: " + response.data.imdbRating);
                console.log("ROTTEN TOMATOES RATING: " + response.data.Ratings[1].Value);
            } else {
                console.log(divider)
                console.log("You Should Try Mr. Nobody");
                console.log(divider)
            }
        })
}

function doWhatItSays() {
    console.log(divider)
    console.log("This Is What You Want..... Click This Link....Trust Me! \n")
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);

        console.log(data.toString());
        var split = data.toString().split(',');
        console.log(divider)
    });
};



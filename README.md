
# Liri Bot CLI 

Thank You For Using Liri Bot!

## Use Our CLI Liri Bot To Access The Following Information.

From Your Terminal / Command Line Interface type "node liri.js" + one of the following commands
1. concert-this <band/artist name> for a list of upcoming concerts for your selection.
2. spotify-this-song <song name> for a list of 5 songs meeting that criteria. You will also be provided a link to preview the song. 
  * If you do nto see your song, try typing the artists name after the song.
  * If no song is selected, Signs by Ace Of Base will be displayed.
3. movie-this <movie title> - This will return information for this movie including release date, language, and even IMDB/Rotten Tomatoes Ratings.
  * If no movie is selected, you will be prompted to try "Mr. Nobody."
4. do-what-it-says <enter> - You will be provided a suggestion that we strongly recommend you try!
5. help - You can use this command at any time to see these options via the terminal.
6. If no command is selected, "Invalid Command" will be returned the CLI.
  
## Packages
To run this program, you must download the following npm packages.
- dotenv
- fs
- axios
- moment
- node-spotify-api
- request

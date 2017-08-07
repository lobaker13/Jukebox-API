/*
 * @param id is SoundCloud assigned id
 * @param title is Song's title
 */
function Song(id, title, artist) {
  this.id = id;
  this.title = title;
  this.artist = artist;
}

function Jukebox() {
  // the following arrays are parallel
  this.songs = []; // our Song object
  this.players = []; // the SoundCloud player object
  this.currentSong = 0;
  this.SC = SC;
  this.SC.initialize({
    client_id: 'GPsZO10XpXbKSuVIh2ROLCUdZUgngDcp'
  });
}
// add a song to the jukebox
Jukebox.prototype.addSong = function() {
  // Array.prototype.push.apply(this.songs,arguments );
  for (let i = 0; i < arguments.length; i++) {
    this.songs.push(arguments[i]);
  }
}
// play the player for the current track
Jukebox.prototype.play = function() {
  console.log("in play", this);
  const self = this;
  let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
    current = document.querySelector("#current");
  // see if we already have a player for
  // the current song...  if so, use that
  if (player) {
    console.log("player detected");
    player.play();
    // to do: update the player song info
  } else {
    console.log("no player detected");
    // else, go and fetch a player, then play
    this.SC.stream('/tracks/' + song.id).then(function(p) {
      console.log("got player", p);
      self.players[self.currentSong] = p;
      console.log(self.players);
      self.play();
      console.log(this.currentSong);
      console.log(currentSong);
      this.songs[this.currentSong].title,
      this.songs[this.currentSong].artist
    });
  }
  current.innerText = song.title + " - " + song.artist;
}
// PAUSE
Jukebox.prototype.pause = function() {
  let player = this.players[this.currentSong],
    song = this.songs[this.currentSong]
  player.pause();
};
// STOP
Jukebox.prototype.stop = function() {
  let player = this.players[this.currentSong],
    song = this.songs[this.currentSong]
  current = document.querySelector("#current");
  player.pause();
  this.currentSong = 0;
  player.seek(0);
  current.innerText = " "
}
// NEXT
Jukebox.prototype.next = function() {
  let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
  if (this.currentSong < this.songs.length - 1) {
    this.currentSong += 1;
  } else {
    this.currentSong = 0;
  };
  player.seek(0);
  this.play();
  console.log(this.currentSong);
}
// BACK
Jukebox.prototype.back = function() {
  let player = this.players[this.currentSong],
    song = this.songs[this.currentSong];
  if (this.currentSong > 0) {
    this.currentSong -= 1;
  } else {
    this.currentSong = this.songs.length - 1;
  };
  player.seek(0);
  this.play();
  console.log(this.currentSong);
}
// SHUFFLE
Jukebox.prototype.shuffle = function() {
  this.currentSong = parseInt(Math.random()*this.songs.length);
  //   //this.el.audio.src = this.songs[this.currentSong].file;
  this.play();
  //this.isRandom = !this.isRandom
}

var myJukebox = new Jukebox();
myJukebox.addSong(
  new Song('16257181', 'People are Strange', 'The Doors'),
  new Song('93873105', "What's my Age Again?", "Blink-182"),
  new Song('32288513', "Fitzpleasure", 'alt-J'),
  new Song('36126940', "Gold on the Ceiling", 'The Black Keys'),
  new Song('85746529', "We Will Rock You (Remix)"));

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.play').addEventListener('click', function(event) {
    myJukebox.play();
  });
  document.querySelector('.next').addEventListener('click', function(event) {
    myJukebox.next();
  });
  document.querySelector('.back').addEventListener('click', function(event) {
    myJukebox.back();
  });
  document.querySelector('.pause').addEventListener('click', function(event) {
    myJukebox.pause();
  });
  document.querySelector('.stop').addEventListener('click', function(event) {
    myJukebox.stop();
  });
  document.querySelector('.random').addEventListener('click', function(event) {
    myJukebox.shuffle();
  });
});

// SC.get('/tracks',{
// 	q:""
// }).then(function(response){
//   console.log("songs", response);
// });

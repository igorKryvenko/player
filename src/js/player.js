
var elems = ['play', 'pause', 'next', 'prev', 'volume-btn', 'progress-bar', 'fa-volume-off'];

elems.forEach(function(elem) {
  window[elem] = document.getElementsByClassName(elem)[0];
});

var Radio = function(stations) {
  this.stations = stations;
  this.index = 0;
  this.volume = 100;
};

Radio.prototype = {
  /**
   * Play a station with a specific index.
   * @param  {Number} index Index in the array of stations.
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.stations[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: data.src,
        html5: true, // A live stream can only be played through HTML5 Audio.
        format: ['mp3', 'aac'],
        onplay: function() {
          pause.style.display = 'block';
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Update the track display.


    // Show the pause button.
    if (sound.state() === 'loaded') {
      play.style.display = 'none';
      pause.style.display = 'block';
    } else {
      play.style.display = 'none';
      pause.style.display = 'none';
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  pause: function(index) {
    var self = this;


    var sound = self.stations[self.index].howl;

    sound.pause();


    play.style.display = 'block';
    pause.style.display = 'none';
  },

  skipTo: function(index) {
    var self = this;

    // Stop the current track.

    if (self.stations[self.index].howl) {
      self.stations[self.index].howl.stop();
    }

    self.play(index);
  },

  skip: function(direction) {
    var self = this;

    var index = 0;

    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.stations.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.stations.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  volumeOff: function(index) {
    var self = this;
    self.volume = 0;
    self.stations[self.index].howl.mute(true);
  },

  volume: function(val) {
    var self = this;
    self.volume = val;

    // Update the global volume (affecting all Howls).
   Howler.volume(val);
  },

  togglePlaylist: function() {

  },

  toggleVolume: function() {

  }


};

// Setup our new radio and pass in the stations.
var player = new Radio([
  {
    freq: '81.4',
    title: "Groove Salad",
    src: ['http://ice1.somafm.com/groovesalad-128-mp3', 'http://ice1.somafm.com/groovesalad-128-aac'],
    howl: null
  },
  {
    freq: '89.9',
    title: "Secret Agent",
    src: ['http://ice1.somafm.com/secretagent-128-mp3', 'http://ice1.somafm.com/secretagent-128-aac'],
    howl: null
  },
  {
    freq: '98.9',
    title: "Indie Pop",
    src: ['http://ice1.somafm.com/indiepop-128-mp3', 'http://ice1.somafm.com/indiepop-128-aac'],
    howl: null
  },
  {
    freq: '103.3',
    title: "Police Radio",
    src: ['http://ice1.somafm.com/sf1033-128-mp3', 'http://ice2.somafm.com/sf1033-64-aac'],
    howl: null
  },
  {
    freq: '107.7',
    title: "The Trip",
    src: ['http://ice1.somafm.com/thetrip-128-mp3', 'http://ice2.somafm.com/thetrip-64-aac'],
    howl: null
  }
]);

$(document).ready(function() {
  if(player.volume === 0) {
    $('.fa-volume-off').hide();
  }
  $('.play').click(function() {
    player.play();
  });
  $('.pause').click(function() {
    player.pause();
  });
  $('.next').click(function() {
    player.skip('next');
  });
  $('.prev').click(function() {
    player.skip('prev');
  });
  $('.fa-volume-off').click(function(event) {
    player.volumeOff();
    $(this).hide();
  });

  $('.range-slider-component').slider({
    min: 0,
    max: 100,
    value: 100,
    range: "min",
    animate: true,
    slide: function(event, ui) {
      player.setVolume((ui.value)/100)
    }
  });
});

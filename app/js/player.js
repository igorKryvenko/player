
var elems = ['play', 'pause', 'next', 'prev', 'volume-btn', 'progress-bar'];

elems.forEach(function(elem) {
  window[elem] = document.getElementByClass(elem);
});


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


    var sound = self.playlist[self.index].howl;

    sound.pause();


    play.style.display = 'block';
    pause.style.display = 'none';
  },

  volume: function(val) {
    var self = this;

    // Update the global volume (affecting all Howls).
   Howler.volume(val);
  },

  togglePlaylist: function() {

  },

  toggleVolume: function() {

  }


};


var elems = ['play', 'pause', 'next', 'prev', 'volume-btn', 'progress-bar'];

elems.forEach(function(elem) {
  window[elem] = document.getElementByClass(elem);
});


var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
}

Player.prototype = {


  play: function(index) {
      var self = this;
      var sound;

      index = typeof index === 'number' ? index : self.index;
      var data = self.playlist[index];


      // If we already loaded this track, use the current one.
// Otherwise, setup and load a new Howl.
if (data.howl) {
  sound = data.howl;
} else {
  sound = data.howl = new Howl({
    src: ['./audio/' + data.file + '.webm', './audio/' + data.file + '.mp3'],
    html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
    onplay: function() {
      // Display the duration.
      duration.innerHTML = self.formatTime(Math.round(sound.duration()));

      // Start upating the progress of the track.
      requestAnimationFrame(self.step.bind(self));

      // Start the wave animation if we have already loaded
      wave.container.style.display = 'block';
      bar.style.display = 'none';
      pauseBtn.style.display = 'block';
    },
    onload: function() {
      // Start the wave animation.
      wave.container.style.display = 'block';
      bar.style.display = 'none';
      loading.style.display = 'none';
    },
    onend: function() {
      // Stop the wave animation.
      wave.container.style.display = 'none';
      bar.style.display = 'block';
      self.skip('right');
    },
    onpause: function() {
      // Stop the wave animation.
      wave.container.style.display = 'none';
      bar.style.display = 'block';
    },
    onstop: function() {
      // Stop the wave animation.
      wave.container.style.display = 'none';
      bar.style.display = 'block';
    }
  });
}

      sound.play();
  }
}

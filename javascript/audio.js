"use strict"

// Audio

  // Background music constructor
  function BackgroundMusic(src) {
    this.audio = new Audio(src);
    this.audio.volume = 0.5; // Set default volume
    this.play = function() {
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented
          console.log('Autoplay prevented:', error);
          // You can handle this situation, e.g., by displaying a message to the user
        });
      }
    };
    this.pause = function() {
      this.audio.pause();
    };
    this.toggleVolume = function() {
      this.audio.volume = this.audio.volume === 0 ? 0.5 : 0;
    };

    // Repeat the music when it ends
    this.audio.addEventListener('ended', function() {
      this.currentTime = 0; // Reset to the beginning
      this.play();
    });
  }

  // Create an instance of BackgroundMusic
  const gameMusic = new BackgroundMusic('/audio/background.music.mp3');

  // Function to toggle volume when clicking the volume icon
  function toggleVolume() {
    gameMusic.toggleVolume();
    // Update the volume icon based on the current volume
    const volumeIcon = document.getElementById('volume-icon');
    volumeIcon.textContent = gameMusic.audio.volume === 0 ? '🔈' : '🔊';
  }

  // Function to start the game on any user click
  function startGame() {
    document.body.removeEventListener('click', startGame); // Remove the event listener
    gameMusic.play();
  }

  // Add an event listener to start the game on any user click
  document.body.addEventListener('click', startGame);
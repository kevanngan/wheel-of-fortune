"use strict"

// Audio

  // Background music constructor
function BackgroundMusic(src) {
    this.audio = new Audio(src);
    this.correctSound = new Audio('/audio/correct.mp3');
    this.wrongSound = new Audio('/audio/wrong.mp3');
  
    this.audio.volume = 0.5; 
    this.play = function () {
      const playPromise = this.audio.play();
  
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented
          console.log('Autoplay prevented:', error);
        });
      }
    };
    this.pause = function () {
      this.audio.pause();
    };
    this.toggleVolume = function () {
      this.audio.volume = this.audio.volume === 0 ? 0.5 : 0;
      updateVolumeIcon();
    };
  
    this.playCorrectSound = function () {
      this.correctSound.play();
    };
  
    this.playWrongSound = function () {
      this.wrongSound.play();
    };
  
    // Repeat the music when it ends
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0; // Reset to the beginning
      this.play();
    });
  }
  
  // Create an instance of BackgroundMusic
  const gameMusic = new BackgroundMusic('/audio/background-music.mp3');
  
  // Function to toggle volume when clicking the volume icon
  function toggleVolume() {
    gameMusic.toggleVolume();
    updateVolumeIcon();
  }
  
  // Function to update the volume icon based on the current volume
  function updateVolumeIcon() {
    const volumeIcon = document.getElementById('volume-icon');
    const iconClass = gameMusic.audio.volume === 0 ? 'fa-volume-mute' : 'fa-volume-up';
    volumeIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
  }
  
  // Function to handle correct guess
  function handleCorrectGuess() {
    // Play correct sound
    gameMusic.playCorrectSound();
  }
  
  // Function to handle incorrect guess
  function handleIncorrectGuess() {
    // Play wrong sound
    gameMusic.playWrongSound();
  }
  
  // Function to start the game on any user click
  function startGame() {
    document.body.removeEventListener('click', startGame);
    gameMusic.play();
  }
  
  // Add an event listener to start the game on any user click
  document.body.addEventListener('click', startGame);


"use strict";

class WheelOfFortune {
  constructor() {
// Game state variables
    this.wordList = ['Apple', 'Orange', 'Pineapple', 'Mango', 'Durian', 'Banana', 'Grape', 'Watermelon', 'Strawberry', 'Kiwi', 'Blueberry', 'Peach', 'Plum', 'Papaya', 'Avocado', 'Raspberry'];
    this.currentWord = '';
    this.playerCash = 0;
    this.guessedLetters = [];
    this.maxIncorrectGuesses = 3;
    this.incorrectGuesses = 0;
    this.lives = 3;

// DOM elements
    this.gameBoardElement = document.getElementById('game-board');
    this.cashElement = document.getElementById('cash');
    this.livesElement = document.getElementById('lives');
    this.lastSpinResult = this.spinWheel();

// Sounds
    this.correctSound = new Audio('/audio/correct.mp3'); 
    this.wrongSound = new Audio('/audio/wrong.mp3'); 
    this.winSound = new Audio('/audio/win.mp3'); 
    this.loseSound = new Audio('/audio/lose.mp3'); 

// Event Listeners 
    document.getElementById('spinBtn').addEventListener('click', () => {
      this.spin();
    });

    document.getElementById('letter-guess-btn').addEventListener('click', () => {
      this.guessLetter();
    });

    document.getElementById('word-guess-btn').addEventListener('click', () => {
      this.guessWord();
    });

// Initialize game
    this.startNewGame();
  }

  // Sounds
  playWinSound() {
    this.winSound.play();
  }

  playLoseSound() {
    this.loseSound.play();
  }

  playCorrectSound() {
    this.correctSound.play();
  }

  playWrongSound() {
    this.wrongSound.play();
  }


// Start game
  startNewGame() {
    this.resetGameState();
    this.displayGameBoard();
    this.updateUI();
    this.disableGuessButtons();

    const startButton = document.getElementById('startBtn');
    // Event listener for the start button
    startButton.addEventListener('click', () => {
      this.hideStartPanel();
      this.enableSpin();
    });
  }
  // Hide the start panel
  hideStartPanel() {
    const startPanel = document.querySelector('.start-panel');
    startPanel.style.display = 'none';
  }

// Reset game state
  resetGameState() {
    this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.guessedLetters = [];
    this.incorrectGuesses = 0;
    this.lives = 3;
    this.playerCash = 0;
  }

  // Letter guess function
  guessLetter() {
    const alphabetSet = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
    // Check if all letters in the alphabet have been guessed
    if (this.guessedLetters.length === alphabetSet.size) {
      alert('You have guessed all the letters of the alphabet. Try another word.');
      this.disableGuessButtons();
      return;
    }
  
    this.showModal('Enter a letter:', (guessedLetter) => {
      if (this.isValidGuess(guessedLetter)) {
        const uppercaseGuessedLetter = guessedLetter.toUpperCase();
  
        if (this.guessedLetters.includes(uppercaseGuessedLetter)) {
          alert('You already guessed this letter.');
        } else {
          this.guessedLetters.push(uppercaseGuessedLetter);
  
          if (this.currentWord.toUpperCase().includes(uppercaseGuessedLetter)) {
            alert('Correct guess!');
            this.displayGameBoard();
            this.handleGuess('correct');
  
            // Check if all correct letters have been guessed
            const correctLetters = this.currentWord.toUpperCase().split('').filter(letter => alphabetSet.has(letter));
            const allCorrectLettersGuessed = correctLetters.every(letter => this.guessedLetters.includes(letter));
            
            if (allCorrectLettersGuessed) {
              this.endGame(true);
            }
          } else {
            alert('Incorrect guess. Try again.');
            this.handleGuess('incorrect');
          }
        }
      } else {
        alert('Invalid guess. Please enter a single letter.');
      }
      this.disableGuessButtons();
    });
  }

// Word guess function
  guessWord() {
    const alphabetSet = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  
    // Check if all letters in the alphabet have been guessed
    if (this.guessedLetters.length === alphabetSet.size) {
      alert('You have guessed all the letters of the alphabet. Try another word.');
      this.disableGuessButtons();
      return;
    }
  
    this.showModal('Enter the word:', (guessedWord) => {
      const sanitizedGuessedWord = guessedWord.trim().toUpperCase();
  
      if (sanitizedGuessedWord === this.currentWord.toUpperCase()) {
        this.displayGameBoard();
        this.endGame(true);
      } else {
        alert('Sorry, incorrect guess. Try again.');
        this.handleGuess('incorrect');
      }
      this.disableGuessButtons();
    });
  }

// Handling guess result
  handleGuess(result) {
    if (result === 'correct') {
      this.updatePlayerCash(this.lastSpinResult);
      this.playCorrectSound();
    } else {
      this.incorrectGuesses++;
      this.lives--;

      if (this.incorrectGuesses >= this.maxIncorrectGuesses || this.lives === 0) {
        this.playWrongSound();
        this.endGame(false);
      } else {
        this.enableGuessButtons();
        this.disableSpin();
        this.playWrongSound();
      }
    }

    this.updateUI();
  }

  updateUI() {
    this.cashElement.innerText = this.playerCash;
    this.livesElement.innerText = this.lives;
  }

  isValidGuess(guessedLetter) {
    return guessedLetter && guessedLetter.length === 1;
  }

// Display the game board with guessed letters
  displayGameBoard() {
    this.gameBoardElement.textContent = this.currentWord
      .split('')
      .map(letter => (this.guessedLetters.includes(letter.toUpperCase()) ? `${letter} ` : '_ '))
      .join('');
  }

// Update player cash
  updatePlayerCash(spinResult) {
    const cashAmount = Number(spinResult);
    if (!isNaN(cashAmount)) {
      this.playerCash += cashAmount;
      this.cashElement.textContent = this.playerCash;
    } else {
      console.error("Invalid cash amount:", spinResult);
    }
  }

// Enable/Disable buttons

  disableGuessButtons() {
    document.getElementById('spinBtn').disabled = false;
    document.getElementById('letter-guess-btn').disabled = true;
    document.getElementById('word-guess-btn').disabled = true;
  }

  enableGuessButtons() {
    document.getElementById('spinBtn').disabled = true;
    document.getElementById('letter-guess-btn').disabled = false;
    document.getElementById('word-guess-btn').disabled = false;
  }

  enableSpin() {
    document.getElementById('spinBtn').disabled = false;
  }

// Modal input
  showModal(message, callback) {
    // Close any existing modals
    this.closeModal();
  
    const modalContainer = this.createModalContainer();
    const modal = this.createModal(message, callback);
  
    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
  }

  createModalContainer() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    return modalContainer;
  }

  createModal(message, callback) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    const inputElement = document.createElement('input');
    inputElement.type = 'text';

    const confirmButton = this.createButton('Confirm', () => {
      const inputValue = inputElement.value.trim();
      callback(inputValue);
      this.closeModal();
    });

    modal.appendChild(messageElement);
    modal.appendChild(inputElement);
    modal.appendChild(confirmButton);

    return modal;
  }

  createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
      document.body.removeChild(modalContainer);
      
      const inputElement = modalContainer.querySelector('input');
      if (inputElement) {
        inputElement.value = '';
      }
    }
  }

// Spin
  spinWheel() {
    return 100; // Set the cash amount to $100
  }

  spin() {
    const wheel = document.querySelector('.wheel');
    let value = Math.ceil(Math.random() * 3600);
  
    wheel.style.transform = "rotate(" + value + "deg)";
    value = Math.ceil(Math.random() * 3600);
  
    this.disableSpin();
  
    setTimeout(() => {
      this.enableGuessButtons();
    }, 5000);
  }

  disableSpin() {
    document.getElementById('spinBtn').disabled = true;
  }
  
  enableSpin() {
    document.getElementById('spinBtn').disabled = false;
  }


// End game
  endGame(hasPlayerWon) {
    if (hasPlayerWon) {
      this.playWinSound();
      alert('Yay! You won!');
    } else {
      this.playLoseSound();
      alert('Sorry, you ran out of lives. You lose!');
    }

    const playAgain = confirm('Do you want to play again?');
    if (playAgain) {
      this.resetGameState();
      this.startNewGame();
      this.enableSpin();
    } else {
      alert('Thank you for playing!');
    }
  }
}

// Start the game
const newWheelOfFortune = new WheelOfFortune();

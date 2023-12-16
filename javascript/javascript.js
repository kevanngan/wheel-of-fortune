"use strict";

class WheelOfFortune {
  constructor() {
    this.wordList = ['Apple', 'Orange', 'Pineapple', 'Mango', 'Durian'];
    this.currentWord = '';
    this.playerCash = 0;
    this.guessedLetters = [];
    this.maxIncorrectGuesses = 3;
    this.incorrectGuesses = 0;
    this.lives = 3;
    this.gameBoardElement = document.getElementById('game-board');
    this.cashElement = document.getElementById('cash');
    this.livesElement = document.getElementById('lives');
    this.lastSpinResult = this.spinWheel();
    this.correctSound = new Audio('/audio/correct.mp3'); 
    this.wrongSound = new Audio('/audio/wrong.mp3'); 
    this.winSound = new Audio('/audio/win.mp3'); 
    this.loseSound = new Audio('/audio/lose.mp3'); 

    
    document.getElementById('spinBtn').addEventListener('click', () => {
      this.spin();
    });

    document.getElementById('letter-guess-btn').addEventListener('click', () => {
      this.guessLetter();
    });

    document.getElementById('word-guess-btn').addEventListener('click', () => {
      this.guessWord();
    });

    this.startNewGame();
  }

  startNewGame() {
    this.resetGameState();
    this.displayGameBoard();
    this.updateUI();
    this.disableGuessButtons();

    const startButton = document.getElementById('startBtn');

    startButton.addEventListener('click', () => {
      this.hideStartPanel();
      this.enableSpin(); // Optionally, enable the spin button after hiding the start panel
    });
  }

  hideStartPanel() {
    const startPanel = document.querySelector('.start-panel');
    startPanel.style.display = 'none';
  }

  resetGameState() {
    this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.guessedLetters = [];
    this.incorrectGuesses = 0;
    this.lives = 3;
    this.playerCash = 0;
  }

  displayGameBoard() {
    this.gameBoardElement.textContent = this.currentWord
      .split('')
      .map(letter => (this.guessedLetters.includes(letter.toUpperCase()) ? `${letter} ` : '_ '))
      .join('');
  }

  isValidGuess(guessedLetter) {
    return guessedLetter && guessedLetter.length === 1;
  }

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
        this.endGame(true); // Correctly call endGame with true for winning
      } else {
        alert('Sorry, incorrect guess. Try again.');
        this.handleGuess('incorrect');
      }
      this.disableGuessButtons();
    });
  }

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

  playCorrectSound() {
    this.correctSound.play();
  }

  playWrongSound() {
    this.wrongSound.play();
  }

  updatePlayerCash(spinResult) {
    const cashAmount = Number(spinResult);
    if (!isNaN(cashAmount)) {
      this.playerCash += cashAmount;
      this.cashElement.textContent = this.playerCash;
    } else {
      console.error("Invalid cash amount:", spinResult);
    }
  }

  updateUI() {
    this.cashElement.innerText = this.playerCash;
    this.livesElement.innerText = this.lives;
  }

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
      
      // Clear input value after closing the modal
      const inputElement = modalContainer.querySelector('input');
      if (inputElement) {
        inputElement.value = '';
      }
    }
  }

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

  playWinSound() {
    this.winSound.play();
  }

  playLoseSound() {
    this.loseSound.play();
  }

  spinWheel() {
    return 100; // Set the cash amount to $100
  }

  spin() {
    const wheel = document.querySelector('.wheel');
    let value = Math.ceil(Math.random() * 3600);
  
    wheel.style.transform = "rotate(" + value + "deg)";
    value = Math.ceil(Math.random() * 3600);
  
    // Disable spin button after spinning
    this.disableSpin();
  
    // Enable guess buttons after a delay (adjust the time as needed)
    setTimeout(() => {
      this.enableGuessButtons();
    }, 5000); // Adjust the time as needed
  }

  disableSpin() {
    document.getElementById('spinBtn').disabled = true;
  }
  
  enableSpin() {
    document.getElementById('spinBtn').disabled = false;
  }
}

// Start the game
const newWheelOfFortune = new WheelOfFortune();

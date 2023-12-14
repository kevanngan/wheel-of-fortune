"use strict"

// Word list
const wordList = ['Apple', 'Orange', 'Pineapple', 'Mango', 'Durian'];

let currentWord = '';
let playerCash = 0;
let guessedLetters = [];
let maxIncorrectGuesses = 3;
let incorrectGuesses = 0;
let lives = 3;

// DOM Elements
const gameBoardElement = document.getElementById('game-board');
const cashElement = document.getElementById('cash');
const livesElement = document.getElementById('lives');

// Event listeners
document.getElementById('spin-btn').addEventListener('click', () => {
  const spinButton = document.getElementById('spin-btn');
  if (!spinButton.disabled) {
    spinButton.disabled = true;
    document.getElementById('wheel').classList.add('spinning');
    const spinResult = Math.floor(Math.random() * 500) + 100;
    setTimeout(() => {
      updatePlayerCash(spinResult);
      document.getElementById('wheel').classList.remove('spinning');
      enableGuessButtons(); // Enable guess buttons after spinning
    }, 1500); // Adjust the time based on your animation duration
  }
});

document.getElementById('letter-guess-btn').addEventListener('click', guessLetter);
document.getElementById('word-guess-btn').addEventListener('click', guessWord);

// Function to start a new game
function startNewGame() {
  resetGameState();
  displayGameBoard();
  updateUI();
  disableGuessButtons();
}

// Function to reset the game state
function resetGameState() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  lives = 3;
  playerCash = 0;
}

// Function to display the game board
function displayGameBoard() {
  gameBoardElement.textContent = currentWord
    .split('')
    .map(letter => (guessedLetters.includes(letter.toUpperCase()) ? `${letter} ` : '_ '))
    .join('');
}

// Function to check if the guessed letter is valid
function isValidGuess(guessedLetter) {
  return guessedLetter && guessedLetter.length === 1;
}

// Function to handle letter guess
function guessLetter() {
  showModal('Enter a letter:', (guessedLetter) => {
    if (isValidGuess(guessedLetter)) {
      const uppercaseGuessedLetter = guessedLetter.toUpperCase();

      if (guessedLetters.includes(uppercaseGuessedLetter)) {
        alert('You already guessed this letter. Try again.');
      } else {
        guessedLetters.push(uppercaseGuessedLetter);

        if (currentWord.toUpperCase().includes(uppercaseGuessedLetter)) {
          alert('Correct guess!');
          displayGameBoard();
          handleGuess('correct');
        } else {
          alert('Incorrect guess. Try again.');
          handleGuess('incorrect');
        }
      }
    } else {
      alert('Invalid guess. Please enter a single letter.');
    }
    disableGuessButtons();
  });
}

// Function to handle word guess
function guessWord() {
  showModal('Enter the word:', (guessedWord) => {
    if (guessedWord === currentWord.toUpperCase()) {
      alert('Congratulations! You won!');
      handleGuess('correct');
      displayGameBoard();
      startNewGame();
    } else {
      alert('Sorry, incorrect guess. Try again.');
      handleGuess('incorrect');
    }
    disableGuessButtons();
  });
}

// Function to handle guesses (both letter and word)
function handleGuess(result) {
  if (result === 'correct') {
    const spinResult = Math.floor(Math.random() * 500) + 100;
    setTimeout(() => {
        updatePlayerCash(spinResult);
        document.getElementById('wheel').classList.remove('spinning');
        enableSpin(); 
        disableGuessButtons(); 
    }, 1500);
} else {
    incorrectGuesses++;
    lives--;

    if (incorrectGuesses >= maxIncorrectGuesses) {
      endGame(false);
    }
    disableGuessButtons(); 
    enableSpin(); 
  }

  updateUI();
}

// Function to update the player's cash
function updatePlayerCash(amount) {
  playerCash += amount;
  cashElement.textContent = playerCash;
}

// Function to update the UI with cash and lives
function updateUI() {
  cashElement.innerText = playerCash;
  livesElement.innerText = lives;
}

// Function to disable both guess and spin buttons
function disableGuessButtons() {
  document.getElementById('spin-btn').disabled = false;
  document.getElementById('letter-guess-btn').disabled = true;
  document.getElementById('word-guess-btn').disabled = true;
}

// Function to enable guess buttons and disable spin button
function enableGuessButtons() {
  document.getElementById('spin-btn').disabled = true;
  document.getElementById('letter-guess-btn').disabled = false;
  document.getElementById('word-guess-btn').disabled = false;
}

function enableSpin() {
  document.getElementById('spin-btn').disabled = false;
}

// Function to show a custom modal for input
function showModal(message, callback) {
  const modalContainer = createModalContainer();
  const modal = createModal(message, callback);

  modalContainer.appendChild(modal);
  document.body.appendChild(modalContainer);
}

// Function to create the modal container
function createModalContainer() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  return modalContainer;
}

// Function to create the modal
function createModal(message, callback) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const messageElement = document.createElement('p');
  messageElement.textContent = message;

  const inputElement = document.createElement('input');
  inputElement.type = 'text';

  const confirmButton = createButton('Confirm', () => {
    const inputValue = inputElement.value.trim();
    callback(inputValue);
    closeModal();
  });

  modal.appendChild(messageElement);
  modal.appendChild(inputElement);
  modal.appendChild(confirmButton);

  return modal;
}

// Function to create a button
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

// Function to close the modal
function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  if (modalContainer) {
    document.body.removeChild(modalContainer);
  }
}

// Function to end the game
function endGame(hasPlayerWon) {
  if (hasPlayerWon) {
    alert('Congratulations! You won!');
  } else {
    alert('Sorry, you lost. Try again!');
  }

  const playAgain = confirm('Do you want to play again?');
  if (playAgain) {
    resetGameState();
    startNewGame();
  } 
}

// Start the initial game
startNewGame();


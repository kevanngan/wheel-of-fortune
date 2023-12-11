"use strict"

// Word list
const wordList = ['Apple', 'Orange', 'Pineapple', 'Mango', 'Durian'];

let currentWord = '';
let playerCash = 0;
let guessedLetters = [];
let maxIncorrectGuesses = 3;
let incorrectGuesses = 0;
let lives = 3;
let hasSpunWheel = false;

// DOM Elements
const gameBoardElement = document.getElementById('game-board');
const cashElement = document.getElementById('cash');
const livesElement = document.getElementById('lives');

// Event listeners
document.getElementById('spin-btn').addEventListener('click', () => {
  const spinResult = Math.floor(Math.random() * 500) + 100;
  updatePlayerCash(spinResult);

  // Unlock the guess buttons after spinning the wheel
  hasSpunWheel = true;
});

document.getElementById('letter-guess-btn').addEventListener('click', guessLetter);
document.getElementById('word-guess-btn').addEventListener('click', guessWord);

// Function to start a new game
function startNewGame() {
  resetGameState();
  displayGameBoard();
  updateUI();
  hasSpunWheel = false;
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
  if (hasSpunWheel) {
    const guessedLetter = prompt('Enter a letter:');

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
  } else {
    alert("You need to spin the wheel first!");
  }
}

// Function to handle word guess
function guessWord() {
  if (hasSpunWheel) {
    const guessedWord = prompt('Enter the word:').toUpperCase();

    if (guessedWord === currentWord.toUpperCase()) {
      alert('Congratulations! You won!');
      handleGuess('correct');
      displayGameBoard();
      startNewGame();
    } else {
      alert('Sorry, incorrect guess. Try again.');
      handleGuess('incorrect');
    }
  } else {
    alert("You need to spin the wheel first!");
  }
}

// Function to handle guesses (both letter and word)
function handleGuess(result) {
  if (hasSpunWheel) {
    if (result === 'correct') {
      const spinResult = Math.floor(Math.random() * 500) + 100;
      updatePlayerCash(spinResult);
    } else {
      incorrectGuesses++;
      lives--;

      if (incorrectGuesses >= maxIncorrectGuesses) {
        endGame(false);
      }
    }

    updateUI();
    hasSpunWheel = false; // Lock guess buttons until the player spins the wheel again
  } else {
    alert("You need to spin the wheel first!");
  }
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


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

// Function to start a new game
function startNewGame() {
  resetGameState();
  displayGameBoard();
  updateUI();
}

// Function to reset the game state
function resetGameState() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  lives = 3;
  playerCash = 0; // Reset player cash
}

// Function to display the game board
function displayGameBoard() {
  gameBoardElement.textContent = currentWord
    .split('')
    .map(letter => (guessedLetters.includes(letter.toUpperCase()) ? `${letter} ` : '_ '))
    .join('');
}

// Function to handle letter guess
function guessLetter() {
  const guessedLetter = prompt('Enter a letter:');

  if (guessedLetter && guessedLetter.length === 1) {
    const uppercaseGuessedLetter = guessedLetter.toUpperCase();

    if (guessedLetters.includes(uppercaseGuessedLetter)) {
      alert('You already guessed this letter. Try again.');
    } else {
      guessedLetters.push(uppercaseGuessedLetter);

      if (currentWord.toUpperCase().includes(uppercaseGuessedLetter)) {
        alert('Correct guess!');
        displayGameBoard();
        updatePlayerCash(100);
      } else {
        alert('Incorrect guess. Try again.');
      }
    }
  } else {
    alert('Invalid guess. Please enter a single letter.');
  }
}

// Function to handle word guess
function guessWord() {
  const guessedWord = prompt('Enter the word:').toUpperCase();

  // Check if the guessed word is correct
  if (guessedWord === currentWord.toUpperCase()) {
    alert('Congratulations! You won!');
    updatePlayerCash(500);
    displayGameBoard();
    startNewGame();
  } else {
    alert('Sorry, incorrect guess. Try again.');
  }
}

// Function to update the player's cash
function updatePlayerCash(amount) {
  playerCash += amount;
  document.getElementById('cash').textContent = playerCash;
}

// Update player cash based on the result
document.getElementById('spin-btn').addEventListener('click', () => {

  const spinResult = Math.floor(Math.random() * 500) + 100;
  updatePlayerCash(spinResult);
});

document.getElementById('letter-guess-btn').addEventListener('click', guessLetter);
document.getElementById('word-guess-btn').addEventListener('click', guessWord);

// Start the initial game
startNewGame();


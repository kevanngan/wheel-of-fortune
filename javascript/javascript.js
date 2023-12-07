"use strict"

// Sample word list
const wordList = ['JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'NODEJS'];

let currentWord = '';
let playerCash = 0;
let guessedLetters = [];

// Function to start a new game
function startNewGame() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];

  // Display the initial game board
  displayGameBoard();
}

// Function to display the game board
function displayGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.textContent = '';

  for (const letter of currentWord) {
    if (guessedLetters.includes(letter)) {
      gameBoard.textContent += letter + ' ';
    } else {
      gameBoard.textContent += '_ ';
    }
  }
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

      if (currentWord.includes(uppercaseGuessedLetter)) {
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
  const guessedWordInput = document.getElementById('word-input');
  const guessedWord = guessedWordInput.value.toUpperCase();

  // Check if the guessed word is correct
  if (guessedWord === currentWord) {
    alert('Congratulations! You won!');

    updatePlayerCash(500);
    displayGameBoard();
    startNewGame();
  } else {
    alert('Sorry, incorrect guess. Try again.');
  }

  guessedWordInput.value = '';
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


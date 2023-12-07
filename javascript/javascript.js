"use strict"

// Sample word list
const wordList = ['JAVASCRIPT', 'HTML', 'CSS', 'REACT', 'NODEJS'];

let currentWord = '';
let playerCash = 0;
let guessedLetters = [];

// Function to start a new game
function startNewGame() {
  // Choose a random word
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];

  // Display the initial game board
  displayGameBoard();
}

// Function to display the game board
function displayGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.textContent = '';

  // Display underscores for each letter in the word
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

  // Check if the guessed letter is valid (not empty and a single character)
  if (guessedLetter && guessedLetter.length === 1) {
    // Convert guessed letter to uppercase for consistency
    const uppercaseGuessedLetter = guessedLetter.toUpperCase();

    // Check if the letter has already been guessed
    if (guessedLetters.includes(uppercaseGuessedLetter)) {
      alert('You already guessed this letter. Try again.');
    } else {
      // Add the guessed letter to the list
      guessedLetters.push(uppercaseGuessedLetter);

      // Check if the guessed letter is in the word
      if (currentWord.includes(uppercaseGuessedLetter)) {
        alert('Correct guess!');
        // Update game board
        displayGameBoard();
        // Update player cash
        updatePlayerCash(100); // Set a sample cash value for correct letter guess
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
    // Update player cash
    updatePlayerCash(500); // Set a sample cash value for correct word guess
    // Update game board with the correct word
    displayGameBoard();
    // Start a new game
    startNewGame();
  } else {
    alert('Sorry, incorrect guess. Try again.');
  }

  // Clear the input field after checking the guess
  guessedWordInput.value = '';
}

// Function to update the player's cash
function updatePlayerCash(amount) {
  playerCash += amount;
  document.getElementById('cash').textContent = playerCash;
}

// Event listeners
document.getElementById('spin-btn').addEventListener('click', () => {
  // Implement wheel spinning logic here
  // Update player cash based on the result
  const spinResult = Math.floor(Math.random() * 500) + 100; // Sample cash value
  updatePlayerCash(spinResult);
});

document.getElementById('letter-guess-btn').addEventListener('click', guessLetter);
document.getElementById('word-guess-btn').addEventListener('click', guessWord);

// Start the initial game
startNewGame();


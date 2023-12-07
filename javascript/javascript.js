"use strict"

// Word list
const words = ["apple", "banana", "orange", "grape"];

let currentWord = '';
let cashAmount = 0;

// Function to start a new game
function startNewGame() {
  // Choose random word
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];

  // Display the initial game board
  displayGameBoard();
}

// Function to display the guess board
function displayGuessBoard() {
    const guessBoard = document.getElementById("guess-board");
    guessBoard.textContent = "";
    for (let letter of currentWord) {
      if (letter === ' ') {
        guessBoard.innerHTML += "&nbsp;";
      } else {
        guessBoard.textContent += "_";
      }
      guessBoard.textContent += " ";
    }
  }

// Function to update the cash amount
function updateCashAmount() {
  const cashAmountElement = document.getElementById("cash-amount");
  cashAmountElement.textContent = cashAmount;
}

// Event listener for spin button
document.getElementById("spin-btn").addEventListener("click", () => {

  const spinResult = Math.floor(Math.random() * 901) + 100;
  cashAmount += spinResult;
});

// Event listener for guess letter button
document.getElementById("guess-word-btn").addEventListener("click", () => {
   
  const wordInput = document.getElementById("word-input");
  const guessedWord = wordInput.value.toLowerCase();
  
  if (guessedWord.length === 1 && currentWord.includes(guessedLetter)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === guessedLetter) {
  
        const guessBoard = document.getElementById("guess-board");
        const guessBoardContent = guessBoard.textContent.split(" ");
        guessBoardContent[i] = guessedLetter;
        guessBoard.textContent = guessBoardContent.join(" ");
      }
    }

    cashAmount += 200; 
    updateCashAmount();
  }

  letterInput.value = "";
});

// Event listener for guess word button
document.getElementById("guess-letter-btn").addEventListener("click", () => {
  const guessedLetter = prompt("Enter the word").toLowerCase();
  if (guessedLetter === currentWord) {
    cashAmount += 500; 
    updateCashAmount();
  }
});

// Start a new game
startNewGame();
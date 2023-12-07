"use strict"

// Word list
const words = ["apple", "banana", "orange", "grape"];

let currentWord;
let cashAmount = 0;

// Function to start a new game
function startNewGame() {
  // Reset variables
  currentWord = words[Math.floor(Math.random() * words.length)];
  cashAmount = 0;

  displayGuessBoard();
  updateCashAmount();
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
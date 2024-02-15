import { startConfetti, stopConfetti, removeConfetti } from '../module/confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let computerScore = 0;
let playerScore = 0;

function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.floor((Math.random() * 5));
  if (computerChoiceNumber === 0) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber === 1) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber === 2) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber === 3) {
    computerChoice = 'lizard';
  } else if (computerChoiceNumber === 4) {
    computerChoice = 'spock';
  }
}

function displayComputerChoice() {
  switch (computerChoice) {
    case 'rock':      
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

function updateScore(playerChoice) {  
  if (playerChoice === computerChoice) {
    resultText.textContent = 'It\'s a tie.';
  } else {
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      setTimeout(stopConfetti, 1000);      
      resultText.textContent = 'You Won!';
      playerScore++;      
      playerScoreEl.textContent = playerScore;      
    } else {
      resultText.textContent = 'You Loose.'; 
      computerScore++; 
      computerScoreEl.textContent = computerScore; 
    }
  }      
}

// Reset Score & playerChoice/computerChoice
function resetAll() {
  computerScore = 0;
  playerScore = 0;
  playerScoreEl.textContent = playerScore;  
  computerScoreEl.textContent = computerScore;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = ''; 
  resetSelected();
}
window.resetAll = resetAll;

// 
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  switch (playerChoice) {
    case 'rock':    
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

window.select = select;

// On startup, set initial values
resetAll();
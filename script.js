// Game elements
var newGameBtn = document.getElementById('js-newGameButton'),
  newGameElem = document.getElementById('js-newGameElement'),
  pickElem = document.getElementById('js-playerPickElement'),
  resultsElem = document.getElementById('js-resultsTableElement'),
  playerPointsElem = document.getElementById('js-playerPoints'),
  playerNameElem = document.getElementById('js-playerName'),
  computerPointsElem = document.getElementById('js-computerPoints'),
  playerPickElem = document.getElementById('js-playerPick'),
  computerPickElem = document.getElementById('js-computerPick'),
  playerResultElem = document.getElementById('js-playerResult'),
  computerResultElem = document.getElementById('js-computerResult'),
  pickRock = document.getElementById('js-playerPick_rock'),
  pickPaper = document.getElementById('js-playerPick_paper'),
  pickScissors = document.getElementById('js-playerPick_scissors'),
  winner = document.getElementById('winner');

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() {
  playerPick('rock')
});
pickPaper.addEventListener('click', function() {
  playerPick('paper')
});
pickScissors.addEventListener('click', function() {
  playerPick('scissors')
});

// Game state
var gameState = "notStarted",
  player = {
    name: " ",
    score: 0
  },
  computer = {
    score: 0
  },
  possiblePicks = ['rock', 'paper', 'scissors'];

// Sets game elements based on game state
function setGameElements() {
  switch (gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

// Starts new game
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');

  if (player.name) {
    playerNameElem.innerHTML = player.name;
    player.score = computer.score = 0;
    gameState = 'started';

    setGameElements();
    setGamePoints();
  }
}

// Gets computer pick
function getComputerPick() {
  return possiblePicks[Math.floor(Math.random() * 3)];
}

// Sets player and computer picks
function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
}

// Checks round winner and sets player and computer points
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone'; // remis
  } else if (
    (computerPick == 'rock' && playerPick == 'scissors') ||
    (computerPick == 'scissors' && playerPick == 'paper') ||
    (computerPick == 'paper' && playerPick == 'rock')) {

    winnerIs = 'computer';
  }

  if (winnerIs == 'player') {
    playerResultElem.innerHTML = "Win!";
    player.score++;
  } else if (winnerIs == 'computer') {
    computerResultElem.innerHTML = "Win!";
    computer.score++;
  }

  setGamePoints();
}

// Displays game points
function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
  whoWins()
}

// Set initial game elements
setGameElements();


function whoWins() {
  if (computer.score === 10) {
    winner.innerHTML = 'The winner is computer';
    gameState = 'ended';
    newGameElem.style.display = 'block';
    newGameBtn.innerText = 'Jeszcze raz';
  } else if (player.score === 10) {
    winner.innerHTML = 'Congratulations! You won!';
    gameState = 'ended';
    newGameElem.style.display = 'block';
    newGameBtn.innerText = 'Jeszcze raz';
  }
};

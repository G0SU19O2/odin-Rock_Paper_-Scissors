// Game state

class GameState {
  constructor(
    humanScore = 0,
    computerScore = 0,
    choices = ["rock", "paper", "scissors"],
    winConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    }
  ) {
    this.humanScore = humanScore;
    this.computerScore = computerScore;
    this.choices = choices;
    this.winConditions = winConditions;
  }
}

const gameState = new GameState();
// Computer choice logic
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * gameState.choices.length);
  return gameState.choices[randomIndex];
}

// Update UI elements
function updateUI(result) {
  document.getElementById("result").textContent = result;
  document.getElementById(
    "userScore"
  ).textContent = `User Score: ${gameState.humanScore}`;
  document.getElementById(
    "computerScore"
  ).textContent = `Computer Score: ${gameState.computerScore}`;
}

// Determine round winner
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }

  if (gameState.winConditions[humanChoice] === computerChoice) {
    gameState.humanScore++;
    return "You win this round!";
  }

  gameState.computerScore++;
  return "Computer wins this round!";
}

// Check if game is over
function checkGameOver() {
  if (gameState.humanScore === 5 || gameState.computerScore === 5) {
    const winner = gameState.humanScore === 5 ? "You win!" : "You lose!";
    setTimeout(() => {
      alert(winner);
      resetGame();
    }, 100);
  }
}

// Reset game state
function resetGame() {
  gameState.humanScore = 0;
  gameState.computerScore = 0;
  updateUI("New game started!");
}

// Event listeners
document.querySelectorAll(".selection button").forEach((button) => {
  button.addEventListener("click", () => {
    const result = playRound(button.id, getComputerChoice());
    updateUI(result);
    checkGameOver();
  });
});

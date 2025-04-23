const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let isGameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function renderBoard() {
  board.innerHTML = '';
  gameState.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleMove(index));
    board.appendChild(cell);
  });
}

function handleMove(index) {
  if (!isGameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => gameState[index] === player)
  );
}

function restartGame() {
  gameState = Array(9).fill("");
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Initial call
restartGame();

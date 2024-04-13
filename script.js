const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (index) => {
  if (boardState[index] !== '' || !gameActive) return;

  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
};

const checkWin = (player) => {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return boardState[index] === player;
    });
  });
};

const checkDraw = () => {
  return boardState.every(cell => {
    return cell !== '';
  });
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell, index) => {
    cell.textContent = '';
    cell.addEventListener('click', () => handleCellClick(index));
  });
};

restartBtn.addEventListener('click', restartGame);

restartGame(); // Start the game initially

import Player from './classes/player';
import Ship from './classes/ship';

const player1Board = document.getElementById('player1-board');
const player2Board = document.getElementById('player2-board');
const status = document.querySelector('.status');

const player1 = new Player();
player1.board.placeShip(new Ship(5), { x: 0, y: 0 }, 'x'); // Carrier
player1.board.placeShip(new Ship(4), { x: 7, y: 7 }, 'y'); // Battleship
player1.board.placeShip(new Ship(3), { x: 9, y: 5 }, 'x'); // Crusier
player1.board.placeShip(new Ship(3), { x: 4, y: 3 }, 'y'); // Submarine
player1.board.placeShip(new Ship(2), { x: 2, y: 8 }, 'x'); // Destroyer

const player2 = new Player();
player2.board.placeShip(new Ship(5), { x: 6, y: 9 }, 'y'); // Carrier
player2.board.placeShip(new Ship(4), { x: 2, y: 1 }, 'x'); // Battleship
player2.board.placeShip(new Ship(3), { x: 0, y: 5 }, 'x'); // Crusier
player2.board.placeShip(new Ship(3), { x: 6, y: 2 }, 'y'); // Submarine
player2.board.placeShip(new Ship(2), { x: 8, y: 4 }, 'x'); // Destroyer

function renderP1Board() {
  player1Board.textContent = '';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');

      switch (player1.board.board[i][j]) {
        case 'O':
          cell.style.backgroundColor = 'rgb(69 85 108)';
          break;
        case 'X':
          cell.classList.add('hit');
          cell.textContent = '✖';
          break;
        case '*':
          cell.classList.add('sunk');
          cell.textContent = '✖';
          break;
        case '-':
          cell.classList.add('miss');
          cell.textContent = '•';
          break;
        default:
          cell.classList.add('virgin');
          break;
      }

      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = j;

      player1Board.append(cell);
    }
  }
}

function renderP2Board() {
  player2Board.textContent = '';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');

      switch (player2.board.board[i][j]) {
        case 'X':
          cell.classList.add('hit');
          cell.textContent = '✖';
          break;
        case '*':
          cell.classList.add('sunk');
          cell.textContent = '✖';
          break;
        case '-':
          cell.classList.add('miss');
          cell.textContent = '•';
          break;
        default:
          cell.classList.add('virgin');
          break;
      }

      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = j;

      cell.addEventListener('click', (e) => {
        player1Turn(e);
      });

      player2Board.append(cell);
    }
  }
}

function player1Turn(e) {
  if (player1.turn === false) return;

  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  const resultAttack = player2.board.receiveAttack({ x, y });

  if (resultAttack === 1) {
    player1.turn = false;
    player2.turn = true;
    renderP2Board();
    checkWinner();
    player2Turn();
  } else if (resultAttack === 2 || resultAttack === 3) {
    renderP2Board();
    checkWinner();
  }
}

async function player2Turn() {
  if (player2.turn === false) return;
  player1Board.classList.remove('disabled');
  player2Board.classList.add('disabled');
  status.textContent = 'TURN: COMPUTER';
  await delay(1000);
  const result = player1.board.receiveCleverAttack();
  renderP1Board();
  checkWinner();

  if (result === 1) {
    player2.turn = false;
    player1.turn = true;
    status.textContent = 'TURN: PLAYER';
    player1Board.classList.add('disabled');
    player2Board.classList.remove('disabled');
  } else if (result === 2 || result === 3) {
    player2Turn();
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function checkWinner() {
  const p1Win = player2.board.allSunk();
  const p2Win = player1.board.allSunk();

  if (p1Win || p2Win) {
    player1.turn = false;
    player2.turn = false;
    player1Board.classList.add('disabled');
    player2Board.classList.add('disabled');

    if (p1Win) {
      status.textContent = 'PLAYER WINS!';
    } else {
      status.textContent = 'COMPUTER WINS!';
    }
  }
}

function game() {
  renderP1Board();
  renderP2Board();
  player1.turn = true;
  player1Board.classList.add('disabled');
}

export default game;

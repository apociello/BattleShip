import Player from './classes/player';

let player1Board, player2Board, player1, player2, status;

function initGame() {
  const main = document.querySelector('main');
  status = document.querySelector('.status');
  player1Board = document.createElement('div');
  player1Board.id = 'player1-board';
  player1Board.classList.add('board');
  player2Board = document.createElement('div');
  player2Board.id = 'player2-board';
  player2Board.classList.add('board');
  main.append(player1Board, player2Board);

  player1 = new Player();
  player1.board.randomShipPlacement();

  player2 = new Player();
  player2.board.randomShipPlacement();
}

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
  initGame();
  renderP1Board();
  renderP2Board();
  player1.turn = true;
  status.textContent = 'TURN: PLAYER';
  player1Board.classList.add('disabled');
}

export default game;

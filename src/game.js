import Player from './classes/player';
import { renderP1Board, renderP2Board } from './render';

let player1Board, player2Board, player1, player2, status; // eslint-disable-line

function initGame(player) {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
  status = document.createElement('p');
  status.classList.add('status');
  player1Board = document.querySelector('#player1-board');
  player2Board = document.createElement('div');
  player2Board.id = 'player2-board';
  player2Board.classList.add('board');
  main.append(player1Board, player2Board);
  body.append(status);
  player1 = player;

  player2 = new Player();
  player2.board.randomShipPlacement();
}

function player1Turn(e) {
  if (player1.turn === false) return;

  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  const resultAttack = player2.board.receiveAttack({ x, y });

  if (resultAttack === 1) {
    player1.turn = false;
    player2.turn = true;
    renderP2Board(player2, player2Board, player1Turn);
    checkWinner(); // eslint-disable-line
    player2Turn(); // eslint-disable-line
  } else if (resultAttack === 2 || resultAttack === 3) {
    renderP2Board(player2, player2Board, player1Turn);
    checkWinner(); // eslint-disable-line
  }
}

async function player2Turn() {
  if (player2.turn === false) return;
  player1Board.classList.remove('disabled');
  player2Board.classList.add('disabled');
  status.textContent = 'TURN: COMPUTER';
  await delay(1000); // eslint-disable-line
  const result = player1.board.receiveCleverAttack();
  renderP1Board(player1, player1Board);
  checkWinner(); // eslint-disable-line

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

function game(player) {
  initGame(player);
  renderP1Board(player1, player1Board);
  renderP2Board(player2, player2Board, player1Turn);
  player1.turn = true;
  status.textContent = 'TURN: PLAYER';
  player1Board.classList.add('disabled');
}

export default game;

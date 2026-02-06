import Player from './classes/player';
import Ship from './classes/ship';

const player1Board = document.getElementById('player1-board');
const player2Board = document.getElementById('player2-board');

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

player1.board.receiveAttack({ x: 0, y: 2 });
player2.board.receiveAttack({ x: 3, y: 3 });

function renderP1Board() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.textContent = player1.board.board[i][j];
      cell.classList.add('cell');
      player1Board.append(cell);
    }
  }
}

function renderP2Board() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.textContent = player2.board.board[i][j];
      cell.classList.add('cell');
      player2Board.append(cell);
    }
  }
}

export { renderP1Board, renderP2Board };

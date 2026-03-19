import { renderP1Board } from './render';

function placeShips(player1, onConfirm) {
  const player1Board = document.querySelector('#player1-board');
  const btnsDiv = document.createElement('div');
  const body = document.querySelector('body');
  btnsDiv.classList.add('buttons');
  const randomiseBtn = document.createElement('button');
  randomiseBtn.textContent = 'Randomise';
  randomiseBtn.classList.add('randomise');
  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('confirm');
  confirmBtn.textContent = 'Confirm';
  btnsDiv.append(randomiseBtn, confirmBtn);
  body.append(btnsDiv);

  // RANDOM PLACEMENT
  player1.board.randomShipPlacement();

  randomiseBtn.addEventListener('click', () => {
    player1.board.resetBoard();
    player1.board.randomShipPlacement();
    renderP1Board(player1, player1Board);
  });

  confirmBtn.addEventListener('click', () => {
    onConfirm();
    btnsDiv.remove();
  });

  renderP1Board(player1, player1Board);
}

export default placeShips;

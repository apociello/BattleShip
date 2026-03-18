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

    // render
    player1Board.textContent = '';

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        switch (player1.board.board[i][j]) {
          case 'O':
            cell.classList.add('place-ship');
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
  });

  confirmBtn.addEventListener('click', () => {
    onConfirm(); 
    btnsDiv.remove();
  });

  // DISPLAY BOARD
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      switch (player1.board.board[i][j]) {
        case 'O':
          cell.classList.add('place-ship');
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

export default placeShips;

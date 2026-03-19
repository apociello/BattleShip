function renderP1Board(player1, player1Board, placementMode = false) {
  player1Board.textContent = ''; // eslint-disable-line

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');

      switch (player1.board.board[i][j]) {
        case 'O':
          cell.classList.add(placementMode ? 'place-ship' : 'ship');
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

function renderP2Board(player2, player2Board, player1Turn) {
  player2Board.textContent = ''; // eslint-disable-line

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

export { renderP1Board, renderP2Board };

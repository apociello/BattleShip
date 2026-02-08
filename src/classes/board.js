class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(' '));
    this.ships = [];
  }

  placeShip(ship, coordinate, axis) {
    if (
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x > 9 ||
      coordinate.y > 9
    )
      return;
    if (axis === 'x' && coordinate.y + (ship.size - 1) > 9) return;
    if (axis === 'y' && coordinate.x - (ship.size - 1) < 0) return;

    if (axis === 'x') {
      for (let i = 0; i < ship.size; i++) {
        if (this.board[coordinate.x][coordinate.y + i] === 'O') return;
      }

      for (let i = 0; i < ship.size; i++) {
        this.board[coordinate.x][coordinate.y + i] = 'O';
        ship.coordinates.push({ x: coordinate.x, y: coordinate.y + i });
      }
    } else if (axis === 'y') {
      for (let i = 0; i < ship.size; i++) {
        if (this.board[coordinate.x - i][coordinate.y] === 'O') return;
        ship.coordinates.push({ x: coordinate.x - i, y: coordinate.y });
      }

      for (let i = 0; i < ship.size; i++) {
        this.board[coordinate.x - i][coordinate.y] = 'O';
      }
    }

    this.ships.push(ship);
  }

  receiveAttack(coordinate) {
    if (
      this.board[coordinate.x][coordinate.y] !== ' ' &&
      this.board[coordinate.x][coordinate.y] !== 'O'
    )
      return 0;

    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].size; j++) {
        if (
          coordinate.x === this.ships[i].coordinates[j].x &&
          coordinate.y === this.ships[i].coordinates[j].y
        ) {
          this.ships[i].hit();
          this.board[coordinate.x][coordinate.y] = 'X';
          return 1;
        }
      }
    }

    this.board[coordinate.x][coordinate.y] = '-';
    return 1;
  }

  receiveRandAttack() {
    let result = 0;

    while (!result) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      result = this.receiveAttack({ x, y });
    }
  }

  allSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === 0) return 0;
    }
    return 1;
  }
}

export default Board;

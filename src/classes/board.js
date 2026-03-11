class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(' '));
    this.ships = [];
    this.pendingShip = 0;
    this.lastShipHits = [];
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
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x > 9 ||
      coordinate.y > 9 ||
      (this.board[coordinate.x][coordinate.y] !== ' ' &&
        this.board[coordinate.x][coordinate.y] !== 'O')
    )
      return 0; // Invalid attack

    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].size; j++) {
        if (
          coordinate.x === this.ships[i].coordinates[j].x &&
          coordinate.y === this.ships[i].coordinates[j].y
        ) {
          this.ships[i].hit();

          if (this.ships[i].isSunk()) {
            this.pendingShip = 0;
            this.lastShipHits = [];

            for (let s = 0; s < this.ships[i].size; s++) {
              const sunkX = this.ships[i].coordinates[s].x;
              const sunkY = this.ships[i].coordinates[s].y;

              this.board[sunkX][sunkY] = '*';
            }
            return 3; // Sunk
          }

          this.board[coordinate.x][coordinate.y] = 'X';
          if (this.pendingShip === 0) this.pendingShip = 1;
          this.lastShipHits.push(coordinate);
          return 2; // Hit
        }
      }
    }

    this.board[coordinate.x][coordinate.y] = '-';
    return 1; // Miss
  }

  receiveRandAttack() {
    let result = 0;

    while (!result) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      result = this.receiveAttack({ x, y });
    }

    return result;
  }

  receiveCleverAttack() {
    if (this.pendingShip) {
      const validShots = [];
      const hits = this.lastShipHits;

      if (hits.length === 1) {
        // NORTH
        if (
          hits[0].x > 0 &&
          (this.board[hits[0].x - 1][hits[0].y] === ' ' ||
            this.board[hits[0].x - 1][hits[0].y] === 'O')
        ) {
          validShots.push({
            x: hits[0].x - 1,
            y: hits[0].y,
          });
        }

        // EAST
        if (
          hits[0].y < 9 &&
          (this.board[hits[0].x][hits[0].y + 1] === ' ' ||
            this.board[hits[0].x][hits[0].y + 1] === 'O')
        ) {
          validShots.push({
            x: hits[0].x,
            y: hits[0].y + 1,
          });
        }

        // SOUTH
        if (
          hits[0].x < 9 &&
          (this.board[hits[0].x + 1][hits[0].y] === ' ' ||
            this.board[hits[0].x + 1][hits[0].y] === 'O')
        ) {
          validShots.push({
            x: hits[0].x + 1,
            y: hits[0].y,
          });
        }

        // WEST
        if (
          hits[0].y > 0 &&
          (this.board[hits[0].x][hits[0].y - 1] === ' ' ||
            this.board[hits[0].x][hits[0].y - 1] === 'O')
        ) {
          validShots.push({
            x: hits[0].x,
            y: hits[0].y - 1,
          });
        }
      }

      if (this.lastShipHits.length > 1) {
        // X AXIS
        if (hits[0].x === hits[1].x) {
          for (let i = 0; i < this.lastShipHits.length; i++) {
            // EAST
            if (
              hits[i].y < 9 &&
              (this.board[hits[i].x][hits[i].y + 1] === ' ' ||
                this.board[hits[i].x][hits[i].y + 1] === 'O')
            ) {
              validShots.push({
                x: hits[i].x,
                y: hits[i].y + 1,
              });
            }

            // WEST
            if (
              hits[i].y > 0 &&
              (this.board[hits[i].x][hits[i].y - 1] === ' ' ||
                this.board[hits[i].x][hits[i].y - 1] === 'O')
            ) {
              validShots.push({
                x: hits[i].x,
                y: hits[i].y - 1,
              });
            }
          }
        } else if (hits[0].y === hits[1].y) {
          // Y AXIS
          for (let i = 0; i < this.lastShipHits.length; i++) {
            // NORTH
            if (
              hits[i].x > 0 &&
              (this.board[hits[i].x - 1][hits[i].y] === ' ' ||
                this.board[hits[i].x - 1][hits[i].y] === 'O')
            ) {
              validShots.push({
                x: hits[i].x - 1,
                y: hits[i].y,
              });
            }

            // SOUTH
            if (
              hits[i].x < 9 &&
              (this.board[hits[i].x + 1][hits[i].y] === ' ' ||
                this.board[hits[i].x + 1][hits[i].y] === 'O')
            ) {
              validShots.push({
                x: hits[i].x + 1,
                y: hits[i].y,
              });
            }
          }
        }
      }

      if (validShots.length === 0) {
        return this.receiveRandAttack();
      }

      const randomIndex = Math.floor(Math.random() * validShots.length);
      return this.receiveAttack(validShots[randomIndex]);
    }

    return this.receiveRandAttack();
  }

  allSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === 0) return 0;
    }
    return 1;
  }
}

export default Board;

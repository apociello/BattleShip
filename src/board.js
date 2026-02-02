class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(" "));
  }

  placeShip(ship, coordinate, axis) {
    if (axis === "x") {
      for (let i = 0; i < ship.size; i++) {
        this.board[coordinate.x][coordinate.y + i] = "O";
      }
    } else if (axis === "y") {
      for (let i = 0; i < ship.size; i++) {
        this.board[coordinate.x - i][coordinate.y] = "O";
      }
    }
  }
}

export default Board;

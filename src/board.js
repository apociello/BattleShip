class Board {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(" "));
  }

  placeShip(ship, coordinate, axis) {
    if (
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x > 9 ||
      coordinate.y > 9
    )
      return;
    if (axis === "x" && coordinate.y + (ship.size - 1) > 9) return;
    if (axis === "y" && coordinate.x - (ship.size - 1) < 0) return;

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

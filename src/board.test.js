import Board from "./board";
import Ship from "./ship";

describe("Board", () => {
  test("each box starts with ' ' value", () => {
    const board = new Board();
    let allBlank = 1;
    for (let i = 0; i < 10 && allBlank; i++) {
      for (let j = 0; j < 10; j++) {
        if (board.board[i][j] !== " ") allBlank = 0;
      }
    }

    expect(allBlank).toBe(1);
  });

  test("ship is correctly placed (x axis)", () => {
    const board = new Board();
    board.placeShip(new Ship(2), { x: 7, y: 3 }, "x");
    expect(board.board[7][3]).toBe("O");
    expect(board.board[7][4]).toBe("O");
  });

  test("ship is correctly placed (y axis)", () => {
    const board = new Board();
    board.placeShip(new Ship(3), { x: 4, y: 7 }, "y");
    expect(board.board[4][7]).toBe("O");
    expect(board.board[3][7]).toBe("O");
    expect(board.board[2][7]).toBe("O");
  });

  test.todo("ship is placed out of limit");
});

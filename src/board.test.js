import Board from './board';
import Ship from './ship';

describe('Board', () => {
  test("each box starts with ' ' value", () => {
    const board = new Board();
    let allBlank = 1;
    for (let i = 0; i < 10 && allBlank; i++) {
      for (let j = 0; j < 10; j++) {
        if (board.board[i][j] !== ' ') allBlank = 0;
      }
    }
    expect(allBlank).toBe(1);
  });

  describe('placeShip', () => {
    test('ship is correctly placed (x axis)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 7, y: 3 }, 'x');
      expect(board.board[7][3]).toBe('O');
      expect(board.board[7][4]).toBe('O');
    });

    test('ship is correctly placed (y axis)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 4, y: 7 }, 'y');
      expect(board.board[4][7]).toBe('O');
      expect(board.board[3][7]).toBe('O');
    });

    test('ship is totally placed out of limit', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 11, y: 23 }, 'x');
      expect(board.board[11]).toBe(undefined);
    });

    test('ship is partially placed out of limit(east)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 5, y: 9 }, 'x');
      expect(board.board[5][9]).toBe(' ');
      expect(board.board[5][10]).toBe(undefined);
    });

    test('ship is partially placed out of limit(west)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 3, y: -1 }, 'x');
      expect(board.board[3][-1]).toBe(undefined);
      expect(board.board[3][0]).toBe(' ');
    });

    test('ship is partially placed out of limit(north)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 0, y: 2 }, 'y');
      expect(board.board[0][2]).toBe(' ');
      expect(board.board[-1]).toBe(undefined);
    });

    test('ship is partially placed out of limit(south)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 10, y: 2 }, 'y');
      expect(board.board[10]).toBe(undefined);
      expect(board.board[9][2]).toBe(' ');
    });
  });
});

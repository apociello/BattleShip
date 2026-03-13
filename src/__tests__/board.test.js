import Board from '../classes/board';
import Ship from '../classes/ship';

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
    test('coordinate values are passed to ship', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 1, y: 2 }, 'x');
      expect(ship1.coordinates[0]).toEqual({ x: 1, y: 2 });
      expect(ship1.coordinates[1]).toEqual({ x: 1, y: 3 });
    });

    test('ship is added to board ships', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 1, y: 2 }, 'x');
      expect(board.ships.length).toEqual(1);
    });

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
      expect(board.board[5][7]).toBe('O');
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
      board.placeShip(new Ship(2), { x: -1, y: 2 }, 'y');
      expect(board.board[-1]).toBe(undefined);
      expect(board.board[0][2]).toBe(' ');
    });

    test('ship is partially placed out of limit(south)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 10, y: 2 }, 'y');
      expect(board.board[10]).toBe(undefined);
      expect(board.board[9][2]).toBe(' ');
    });

    test('ships are correctly placed', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 7, y: 3 }, 'x');
      board.placeShip(new Ship(2), { x: 8, y: 7 }, 'y');
      expect(board.board[7][3]).toBe('O');
      expect(board.board[7][4]).toBe('O');
      expect(board.board[8][7]).toBe('O');
      expect(board.board[9][7]).toBe('O');
    });

    test("ships don't overlap", () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 1, y: 2 }, 'x');
      board.placeShip(new Ship(2), { x: 0, y: 3 }, 'y');
      expect(board.board[1][2]).toBe('O');
      expect(board.board[1][3]).toBe('O');
      expect(board.board[0][3]).toBe(' ');
    });

    test('ships keep a min 1 cell distance (X axis)', () =>{
      const board = new Board();
      board.placeShip(new Ship(2), { x: 5, y: 5 }, 'x');
      expect(board.board[5][5]).toBe('O');
      expect(board.board[5][6]).toBe('O');

      // NORTH
      board.placeShip(new Ship(2), { x: 4, y: 5 }, 'x');
      expect(board.board[4][5]).toBe(' ');
      expect(board.board[4][6]).toBe(' ');
      
      // NORTH-EAST
      board.placeShip(new Ship(2), { x: 4, y: 7 }, 'x');
      expect(board.board[4][7]).toBe(' ');
      expect(board.board[4][8]).toBe(' ');

      // EAST
      board.placeShip(new Ship(2), { x: 5, y: 7 }, 'x'); 
      expect(board.board[5][7]).toBe(' '); 
      expect(board.board[5][8]).toBe(' ');

      // SOUTH-EAST
      board.placeShip(new Ship(2), { x: 6, y: 7 }, 'x'); 
      expect(board.board[6][7]).toBe(' '); 
      expect(board.board[6][8]).toBe(' ');

      // SOUTH 
      board.placeShip(new Ship(2), { x: 6, y: 5 }, 'x'); 
      expect(board.board[6][5]).toBe(' '); 
      expect(board.board[6][6]).toBe(' ');

      // SOUTH-WEST
      board.placeShip(new Ship(2), { x: 6, y: 3 }, 'x'); 
      expect(board.board[6][3]).toBe(' '); 
      expect(board.board[6][4]).toBe(' ');

      // WEST 
      board.placeShip(new Ship(2), { x: 5, y: 3 }, 'x'); 
      expect(board.board[5][3]).toBe(' '); 
      expect(board.board[5][4]).toBe(' ');

      // NORTH-WEST
      board.placeShip(new Ship(2), { x: 4, y: 3 }, 'x'); 
      expect(board.board[4][3]).toBe(' '); 
      expect(board.board[4][4]).toBe(' ');
    });

    test('ships keep a min 1 cell distance (Y axis)', () => {
      const board = new Board();
      board.placeShip(new Ship(2), { x: 5, y: 5 }, 'y');
      expect(board.board[5][5]).toBe('O');
      expect(board.board[6][5]).toBe('O');

      // NORTH
      board.placeShip(new Ship(2), { x: 3, y: 5 }, 'y');
      expect(board.board[3][5]).toBe(' ');
      expect(board.board[4][5]).toBe(' ');

      // NORTH-EAST
      board.placeShip(new Ship(2), { x: 3, y: 6 }, 'y');
      expect(board.board[3][6]).toBe(' ');
      expect(board.board[4][6]).toBe(' ');

      // EAST
      board.placeShip(new Ship(2), { x: 5, y: 6 }, 'y');
      expect(board.board[5][6]).toBe(' ');
      expect(board.board[6][6]).toBe(' ');

      // SOUTH-EAST
      board.placeShip(new Ship(2), { x: 7, y: 6 }, 'y');
      expect(board.board[7][6]).toBe(' ');
      expect(board.board[8][6]).toBe(' ');

      // SOUTH
      board.placeShip(new Ship(2), { x: 7, y: 5 }, 'y');
      expect(board.board[7][5]).toBe(' ');
      expect(board.board[8][5]).toBe(' ');

      // SOUTH-WEST
      board.placeShip(new Ship(2), { x: 7, y: 4 }, 'y');
      expect(board.board[7][4]).toBe(' ');
      expect(board.board[8][4]).toBe(' ');

      // WEST
      board.placeShip(new Ship(2), { x: 5, y: 4 }, 'y');
      expect(board.board[5][4]).toBe(' ');
      expect(board.board[6][4]).toBe(' ');

      // NORTH-WEST
      board.placeShip(new Ship(2), { x: 3, y: 4 }, 'y');
      expect(board.board[3][4]).toBe(' ');
      expect(board.board[4][4]).toBe(' ');
    });
  });

  describe('receiveAttack', () => {
    test('hit increases 1', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 1, y: 2 }, 'x');
      board.receiveAttack({ x: 1, y: 3 });
      expect(ship1.hits).toBe(1);
    });

    test('miss increases 0', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 1, y: 2 }, 'x');
      board.receiveAttack({ x: 7, y: 5 });
      expect(ship1.hits).toBe(0);
    });

    test('2 hits and 1 miss increase 2', () => {
      const board = new Board();
      const ship1 = new Ship(4);
      board.placeShip(ship1, { x: 6, y: 7 }, 'y');
      board.receiveAttack({ x: 6, y: 7 });
      board.receiveAttack({ x: 4, y: 1 });
      board.receiveAttack({ x: 8, y: 7 });
      expect(ship1.hits).toBe(2);
    });

    test('2 hits in the same position -> totals 1 hit', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 4, y: 5 }, 'x');
      board.receiveAttack({ x: 4, y: 5 });
      board.receiveAttack({ x: 4, y: 5 });
      expect(ship1.hits).toBe(1);
    });

    test('board records all shots', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      board.receiveAttack({ x: 0, y: 0 });
      board.receiveAttack({ x: 7, y: 8 });
      expect(board.board[0][0]).toBe('X');
      expect(board.board[7][8]).toBe('-');
    });

    test('board records sunk ship', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      board.receiveAttack({ x: 0, y: 0 });
      board.receiveAttack({ x: 0, y: 1 });
      expect(board.board[0][0]).toBe('*');
      expect(board.board[0][0]).toBe('*');
    });

    test('repeated shot returns 0', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      board.receiveAttack({ x: 0, y: 0 });
      const result = board.receiveAttack({ x: 0, y: 0 });
      expect(result).toBe(0);
    });

    test('Out of range shot returns 0', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      const result = board.receiveAttack({ x: -1, y: 13 });
      expect(result).toBe(0);
    });

    test('missed shot returns 1', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      const result = board.receiveAttack({ x: 5, y: 5 });
      expect(result).toBe(1);
    });

    test('hit returns 2', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      const result = board.receiveAttack({ x: 0, y: 0 });
      expect(result).toBe(2);
    });

    test('Sunk ship returns 3', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      board.receiveAttack({ x: 0, y: 0 });
      const result = board.receiveAttack({ x: 0, y: 1 });
      expect(result).toBe(3);
    });
  });

  describe('receiveCleverAttack', () => {
    test('calls receiveRandAttack only if no pending ships (hit & not sunk)', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');

      const spy = jest.spyOn(board, 'receiveRandAttack');
      board.receiveCleverAttack();
      expect(spy).toHaveBeenCalled();

      spy.mockClear();
      board.receiveAttack({ x: 0, y: 0 });
      board.receiveCleverAttack();
      expect(spy).not.toHaveBeenCalled();
    });

    test('attacks around a single hit', () => {
      const board = new Board();
      const ship = new Ship(2);
      board.placeShip(ship, { x: 1, y: 1 }, 'x');
      board.receiveAttack({ x: 1, y: 1 });
      const spy = jest.spyOn(board, 'receiveAttack');
      board.receiveCleverAttack();

      const lastCallArg = spy.mock.calls[0][0];

      const validAdjacents = [
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 2 },
      ];

      expect(validAdjacents).toContainEqual(lastCallArg);

      spy.mockRestore();
    });

    test('attacks along X axis with more than one hit', () => {
      const board = new Board();
      const ship = new Ship(3);
      board.placeShip(ship, { x: 4, y: 3 }, 'x');

      board.receiveAttack({ x: 4, y: 3 });
      board.receiveAttack({ x: 4, y: 4 });

      const spy = jest.spyOn(board, 'receiveAttack');
      board.receiveCleverAttack();

      const lastCallArg = spy.mock.calls[0][0];

      const validAlongX = [
        { x: 4, y: 2 },
        { x: 4, y: 5 },
      ];

      expect(validAlongX).toContainEqual(lastCallArg);

      spy.mockRestore();
    });

    test('attacks along Y axis with more than one hit', () => {
      const board = new Board();
      const ship = new Ship(3);
      board.placeShip(ship, { x: 3, y: 4 }, 'y');

      board.receiveAttack({ x: 3, y: 4 });
      board.receiveAttack({ x: 4, y: 4 });

      const spy = jest.spyOn(board, 'receiveAttack');
      board.receiveCleverAttack();

      const lastCallArg = spy.mock.calls[0][0];

      const validAlongY = [
        { x: 2, y: 4 },
        { x: 5, y: 4 },
      ];

      expect(validAlongY).toContainEqual(lastCallArg);

      spy.mockRestore();
    });
  });

  describe('allSunk', () => {
    test('all ships sunk return 1', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      const ship2 = new Ship(3);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      board.placeShip(ship2, { x: 4, y: 0 }, 'y');
      board.receiveAttack({ x: 0, y: 0 });
      board.receiveAttack({ x: 0, y: 1 });
      board.receiveAttack({ x: 4, y: 0 });
      board.receiveAttack({ x: 5, y: 0 });
      board.receiveAttack({ x: 6, y: 0 });

      expect(board.allSunk()).toBe(1);
    });

    test('all ships not sunk return 0', () => {
      const board = new Board();
      const ship1 = new Ship(2);
      board.placeShip(ship1, { x: 0, y: 0 }, 'x');
      expect(board.allSunk()).toBe(0);
    });
  });
});

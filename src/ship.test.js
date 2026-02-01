import Ship from "./ship";

describe("Ship", () => {
  test("starts with 0 hits", () => {
    const ship = new Ship(2);
    expect(ship.hits).toBe(0);
  });

  test("hit increases hits", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("ship is sunk if hits >= size", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    const sunk = ship.isSunk();
    expect(sunk).toBe(1);
  });
});

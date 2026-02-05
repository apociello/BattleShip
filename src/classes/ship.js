class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.coordinates = [];
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size ? 1 : 0;
  }
}

export default Ship;

class Ship {
    constructor(size) {
        this.size = size;
        this.hits = 0;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits >= this.size ? 1 : 0;
    }
}

export { Ship };
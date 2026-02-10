import Board from './board';

class Player {
    constructor() {
        this.board = new Board();
        this.turn = false;
    }
}

export default Player;
import { inject } from '@vercel/analytics';
import './style.css';
import Player from './classes/player';
import placeShips from './place-ships';
import game from './game';

inject();

const player1 = new Player();

function startGame() {
  game(player1);
}

placeShips(player1, startGame);

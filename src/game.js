import Phaser from 'phaser';

let game;

export default function() {
  if (!game) {
    game = Phaser.GAMES[0];
  }

  return game;
}

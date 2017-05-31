import Phaser from 'phaser';

import frames from '../../sprite-frames';

import update from './update';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN);

    this.anchor.setTo(0.5, 0.5);

    this.update = update.bind(this);

    console.log(this.game.state.states.Game);
  }
}

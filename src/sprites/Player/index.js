import Phaser from 'phaser';

import frames from '../../sprite-frames';

import { checkFacing } from '../Common/update/controllable';
import update from './update';
import Inventory from './inventory';

export default class extends Phaser.Sprite {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN);

    this.anchor.setTo(0.5, 0.5);

    this.faceDirection = 'DOWN';
    this.faceObject = null;

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);

    // run checkFacing once so that hints will show properly at game start
    checkFacing.call(this);
  }
}

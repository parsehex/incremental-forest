import CommonObject from '../Common';

import frames from '../../sprite-frames';

import update from './update';
import Inventory from './inventory';
import Cursor from './Cursor';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN, 'player', 'player');

    this.faceDirection = 'DOWN';
    this.faceObjects = [];

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);

    this.cursor = new Cursor(this);
  }
}

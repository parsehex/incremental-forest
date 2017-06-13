import CommonCharacter from '../Common';

import frames from '../../../sprite-frames';

import update from './update';
import Inventory from './inventory';
import Cursor from './Cursor';
import hireWorker from './hire-worker';
import fireWorker from './fire-worker';

export default class extends CommonCharacter {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN, 'player', 'player');

    this.faceDirection = 'DOWN';
    this.faceObjects = [];

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);

    this.cursor = new Cursor(this);

    this.hireWorker = hireWorker.bind(this);
    this.fireWorker = fireWorker.bind(this);
  }
}

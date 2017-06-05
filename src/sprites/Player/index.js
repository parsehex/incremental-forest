import CommonObject from '../Common';

import frames from '../../sprite-frames';

import { checkFacing } from '../Common/update/controllable';
import update from './update';
import Inventory from './inventory';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN, 'player');

    this.faceDirection = 'DOWN';
    this.faceObjects = [];

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);

    // run checkFacing once so that hints will show properly at game start
    this.checkFacing = checkFacing.bind(this);

    this.checkFacing();
  }
}

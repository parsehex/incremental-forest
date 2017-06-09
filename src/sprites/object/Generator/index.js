import CommonObject from '../Common';

import frames from '../../../sprite-frames';
import Inventory from './inventory';

import update from './update';
import { facing, notFacing } from './facing';
import interact from './interact';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.GENERATOR_OFF);

    this.inventory = new Inventory(this.game);
    this.timer = null;
    this.powered = false;

    this.facing = facing.bind(this);
    this.notFacing = notFacing.bind(this);

    this.interact = interact.bind(this);

    this.update = update.bind(this);
  }
}

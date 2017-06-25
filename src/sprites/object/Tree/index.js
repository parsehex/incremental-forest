import CommonObject from '../Common';

import frames from '../../../sprite-frames';
import { hideHint } from '../../../ui';

import { facing, notFacing } from './facing';
import interact from './interact';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.TREE, null, 'tree');

    this.facing = facing.bind(this);
    this.notFacing = notFacing.bind(this);

    this.interact = interact.bind(this);

    this.progress = 0;
    this.progressMax = 28;

    this.bar = null;
  }

  resetObject() {
    super.resetObject();
    
    this.progress = 0;

    if (this.bar) this.bar.update();
  }
}

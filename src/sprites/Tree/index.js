import CommonObject from '../Common';

import frames from '../../sprite-frames';
import { hideHint } from '../../ui';

import { facing, notFacing } from './facing';
import interact from './interact';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.TREE);

    this.facing = facing.bind(this);
    this.notFacing = notFacing.bind(this);

    this.interact = interact.bind(this);
  }

  destroy() {
    hideHint();

    super.destroy();
  }
}

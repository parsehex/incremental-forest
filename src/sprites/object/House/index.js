import CommonObject from '../Common';

import frames from '../../../sprite-frames';

import interact from './interact';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.HOUSE, null, 'house');

    this.interact = interact.bind(this);
  }
}

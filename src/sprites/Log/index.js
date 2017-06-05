import CommonObject from '../Common';

import frames from '../../sprite-frames';

import collide from './collide';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.LOG);

    this.collides = false;
    this.collide = collide.bind(this);
  }
}

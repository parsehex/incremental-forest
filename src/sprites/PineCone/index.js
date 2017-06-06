import CommonObject from '../Common';

import frames from '../../sprite-frames';

import collide from './collide';
import placed from './placed';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'tiles', frames.MAIN.PINE_CONE, null, 'pine-cone');

    this.collides = false;
    this.collide = collide.bind(this);

    this.placed = placed.bind(this);
  }
}

import CommonObject from '../Common';

import frames from '../../../sprite-frames';
import { hideHint } from '../../../ui';

import collide from './collide';
import interact from './interact';
import place from './place';
import { facing, notFacing } from './facing';

export default class extends CommonObject {
  constructor({ game, x, y, placed }) {
    const importantProps = {
      placed: !!placed,
    };

    super(game, x, y, 'tiles', frames.MAIN.PINE_CONE, null, 'pine-cone', importantProps);

    this.collides = false;
    this.collide = collide.bind(this);

    this.interact = interact.bind(this);

    this.placed = !!placed;
    this.place = place.bind(this);

    this.facing = facing.bind(this);
    this.notFacing = notFacing.bind(this);
  }

  resetObject() {
    super.resetObject();
    
    this.placed = false;
  }

  pickUp(character) {
    if (character.inventory.items['pine-cone'].isMax) return;

    character.inventory.items['pine-cone'].value++;

    this.destroy();
  }

  destroy() {
    // reset objectType so that this gets put in the pine-cone pool and not the planted-pine-cone pool
    this.objectType = 'pine-cone';

    super.destroy();
  }
}

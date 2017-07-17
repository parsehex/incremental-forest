import Common from '../../Common';

import world from '../../../world';

export default class CommonObject extends Common {
  constructor(game, x, y, sprite, frame, id, objectType, props) {
    super(game, x, y, sprite, frame, id, objectType);

    props = props || {};

    let propKeys = Object.keys(props);
    for (let i = 0; i < propKeys.length; i++) {
      this[propKeys[i]] = props[propKeys[i]];
    }

    this.game.state.states.Game.groups.objects.add(this);

    world.add(this.tile.x, this.tile.y, this);
  }

  changeType(newType) {
    this.objectType = newType;
  }

  resetObject() {
    super.resetObject();

    world.add(this.tile.x, this.tile.y, this);
  }

  destroy() {
    world.remove(this.tile.x, this.tile.y, this);

    super.destroy();
  }
}

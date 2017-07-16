import Common from '../../Common';

import { add, remove, changeType } from '../../../world';

export default class CommonObject extends Common {
  constructor(game, x, y, sprite, frame, id, objectType, props) {
    super(game, x, y, sprite, frame, id, objectType);

    props = props || {};

    let propKeys = Object.keys(props);
    for (let i = 0; i < propKeys.length; i++) {
      this[propKeys[i]] = props[propKeys[i]];
    }

    this.game.state.states.Game.groups.objects.add(this);

    add(
      this.tile.x, this.tile.y,
      this.id, this.objectType,
      this
    );
  }

  changeType(newType) {
    changeType(
      this.tile.x, this.tile.y,
      this.objectType, newType
    );

    this.objectType = newType;
  }

  resetObject() {
    super.resetObject();

    add(
      this.tile.x, this.tile.y,
      this.id, this.objectType,
      this
    );
  }

  destroy() {
    remove(
      this.tile.x, this.tile.y,
      this.id, this.objectType,
    );

    super.destroy();
  }
}

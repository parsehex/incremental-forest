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

    add.call(this, null);
  }

  changeType(newType) {
    changeType.call(this, newType);

    this.objectType = newType;
  }

  destroy() {
    remove.call(this);

    super.destroy();
  }
}

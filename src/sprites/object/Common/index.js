import Common from '../../Common';

import { add, remove } from '../../../world';

export default class CommonObject extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.objects.add(this);

    add.call(this, null);
  }

  destroy() {
    remove.call(this);

    super.destroy();
  }
}

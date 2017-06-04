import { hideHint } from '../../ui';

import Log from '../Log';

export default function interact() {
  const player = this.game.state.states.Game.player;

  const log = new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  this.game.add.existing(log);

  this.destroy();

  player.checkFacing();
  hideHint();
}

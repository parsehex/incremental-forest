import { hideHint } from '../../ui';

import Log from '../Log';

export default function interact() {
  const log = new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  this.game.add.existing(log);

  // NOTE assuming player is facing us
    // possible this isn't always the case
  this.game.state.states.Game.player.faceObject = log;
  hideHint();

  this.destroy();
}

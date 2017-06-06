import { hideHint } from '../../ui';

import Log from '../Log';
import PineCone from '../PineCone';

export default function interact() {
  const player = this.game.state.states.Game.player;

  const log = new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  const randomNumber = Math.floor(Math.random() * 100);
  const seedChance = 25;
  if (randomNumber <= seedChance) {
    const treeSeed = new PineCone({
      game: this.game,
      x: this.x,
      y: this.y,
    });
  }

  this.destroy();

  hideHint();
}

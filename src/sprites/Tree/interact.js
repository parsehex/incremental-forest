import { hideHint } from '../../ui';

import Log from '../Log';
import TreeSeed from '../TreeSeed';

export default function interact() {
  const player = this.game.state.states.Game.player;

  const log = new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  this.game.add.existing(log);

  const randomNumber = Math.floor(Math.random() * 100);
  const seedChance = 25;
  if (randomNumber <= seedChance) {
    const treeSeed = new TreeSeed({
      game: this.game,
      x: this.x,
      y: this.y,
    });

    this.game.add.existing(treeSeed);
  }

  this.destroy();

  player.checkFacing();
  hideHint();
}

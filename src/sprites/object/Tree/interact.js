import getChance from '../../../game-data/chances';
import { clamp, tryChance } from '../../../utils';
import objectPool from '../../../object-pool';
import devtools from '../../../devtools';
import ProgressBar from './ProgressBar';

import Log from '../Log';
import PineCone from '../PineCone';

const instaChop = devtools.enabled && devtools.instaChop;

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

  if (!instaChop) {
    const rank = character.id === 'player' ? character.inventory.get('wood-axe', 'rank') : character.inventory.items['wood-axe'].rank;
    const chopAmount = clamp((rank + 1) * 0.35, 1, 28);
    this.progress += chopAmount;

    if (!this.bar) this.bar = new ProgressBar(this);
    this.bar.update();

    if (this.progress < this.progressMax) return;
  }

  // tree is at max progress (i.e. chopped down)
  const { game, x, y } = this;

  this.destroy();

  objectPool.new('log', Log, {
    game,
    x,
    y,
  });

  if (tryChance(getChance('pine-cone'))) {
    objectPool.new('pine-cone', PineCone, {
      game,
      x,
      y,
    }).bringToTop();
  }

  return true;
}

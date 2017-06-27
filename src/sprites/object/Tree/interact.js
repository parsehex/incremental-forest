import getChance from '../../../game-data/chances';
import { tryChance } from '../../../utils';
import objectPool from '../../../object-pool';
import devtools from '../../../devtools';
import ProgressBar from './ProgressBar';

import Log from '../Log';
import PineCone from '../PineCone';

const instaChop = devtools.enabled && devtools.instaChop;

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

  if (!instaChop) {
    const chopAmount = character.inventory.items['wood-axe'].rank;
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

  if (tryChance(getChance('seedDrop'))) {
    objectPool.new('pine-cone', PineCone, {
      game,
      x,
      y,
    });
  }

  return true;
}

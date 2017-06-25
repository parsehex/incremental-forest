import { seedDrop as seedDropChance } from '../../../game-data/chances';
import { tryChance } from '../../../utils';
import objectPool from '../../../object-pool';
import devtools from '../../../devtools';

import Log from '../Log';
import PineCone from '../PineCone';

const instaChop = devtools.enabled && devtools.instaChop;

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

  if (!instaChop) {
    this.progress += 2;
    if (this.bar) this.bar.update();

    if (this.progress < this.progressMax) return;
  }

  const { game, x, y } = this;

  this.destroy();

  objectPool.new('log', Log, {
    game,
    x,
    y,
  });

  if (tryChance(seedDropChance)) {
    objectPool.new('pine-cone', PineCone, {
      game,
      x,
      y,
    });
  }

  return true;
}

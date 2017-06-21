import { seedDrop as seedDropChance } from '../../../game-data/chances';
import { tryChance } from '../../../utils';
import objectPool from '../../../object-pool';

import Log from '../Log';
import PineCone from '../PineCone';

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

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
}

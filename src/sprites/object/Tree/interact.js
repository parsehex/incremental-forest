import { seedDrop as seedDropChance } from '../../../game-data/chances';
import { tryChance } from '../../../utils';

import Log from '../Log';
import PineCone from '../PineCone';

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

  new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  if (tryChance(seedDropChance)) {
    new PineCone({
      game: this.game,
      x: this.x,
      y: this.y,
    });
  }

  this.destroy();
}

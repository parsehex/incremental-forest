import { clamp } from '../../../utils';
import objectPool from '../../../object-pool';
import devtools from '../../../devtools';
import ProgressBar from '../../Common/ProgressBar';

import Rocks from '../Rocks';

const instaChop = devtools.enabled && devtools.instaChop;

export default function interact(character) {
  if (character.inventory.selected !== 'pick-axe') return;

  if (!instaChop) {
    const rank = character.id === 'player' ? character.inventory.get('pick-axe', 'rank') : character.inventory.items['pick-axe'].rank;
    const chopAmount = clamp((rank + 1) * 0.35, 1, 28);
    this.progress += chopAmount;

    if (!this.bar) this.bar = new ProgressBar(this);
    this.bar.update();

    if (this.progress < this.progressMax) return;
  }

  // rock is at max progress (i.e. chopped down)
  const { game, x, y } = this;

  this.destroy();

  objectPool.new('rocks', Rocks, {
    game,
    x,
    y,
  });

  return true;
}

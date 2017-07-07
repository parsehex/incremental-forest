import getGame from '../../game';

import { increaseChance } from '../chances';

export default {
  'wood-axe': {
    count: 0,
    basePrice: 14,
    multiplier: 2.93,
    max: 24,
    buyCallback: function() {
      getGame().player.inventory.increment('wood-axe', 'rank');
    },
  },
  'pine-cone': {
    count: 0,
    basePrice: 2.50,
    multiplier: 1.153,
    max: 75,
    buyCallback: function() {
      increaseChance('seedDrop');
    },
  },
  'sell-price': {
    count: 0,
    basePrice: 12,
    multiplier: 3.417,
    max: 999,
    buyCallback: function() {
      getGame().player.inventory.sellMultiplier += 0.5;
    },
  },
  'tree-grow': {
    count: 0,
    basePrice: 13,
    multiplier: 1.39,
    max: 80,
    buyCallback: function() {
      increaseChance('treeGrow');
    },
  },
};

import getGame from '../../game';

export default {
  'wood-axe': {
    count: 0,
    basePrice: 14,
    multiplier: 1.85,
    max: 24,
    buyCallback: function() {
      getGame().player.inventory.increment('wood-axe', 'rank');
    },
  },
  'pine-cone': {
    count: 0,
    basePrice: 2.50,
    multiplier: 1.153,
    max: 40,
    buyCallback: function() {},
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
    max: 35,
    buyCallback: function() {},
  },
};

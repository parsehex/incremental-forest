import getGame from '../../game';

export default {
  'bulk-pine-cones': {
    count: 0,
    basePrice: 50,
    multiplier: 1,
    max: null,
    buyCallback: function() {
      const inventory = getGame().player.inventory;
      inventory.set('pine-cone', 'value', inventory.get('pine-cone') + 10);
    },
  },
  'house': {
    count: 0,
    basePrice: 500,
    multiplier: 1.13,
    max: null,
    buyCallback: function() {
      const inventory = getGame().player.inventory;
      inventory.set('house', 'value', inventory.get('house') + 1);
    },
  },
};

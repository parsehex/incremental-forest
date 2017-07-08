import getGame from '../../game';

export default {
  // hiring/firing workers (change deposit amounts here)
  'hire-chopper': {
    count: 0,
    basePrice: 150,
    multiplier: 1.74,
    max: 12,
    freeCount: 0,
    buyCallback: function() {
      getGame().player.hireWorker('chopper');
    },
  },
  'fire-chopper': {
    count: 0, basePrice: 0, multiplier: 0, max: 0,
    decrement: 'hire-chopper',
    buyCallback: function() {
      getGame().player.fireWorker('chopper');
    },
  },
  'hire-collector': {
    count: 0,
    basePrice: 100,
    multiplier: 2.33,
    max: 12,
    freeCount: 0,
    buyCallback: function() {
      getGame().player.hireWorker('collector');
    },
  },
  'fire-collector': {
    count: 0, basePrice: 0, multiplier: 0, max: 0,
    decrement: 'hire-chopper',
    buyCallback: function() {
      getGame().player.fireWorker('collector');
    },
  },

  // chopper upgrades
  'chopper-wood-axe': {
    count: 0,
    basePrice: 14,
    multiplier: 2.93,
    max: 24,
    buyCallback: function() {
      const choppers = getGame().groups.character.children.filter((o) => o.objectType === 'chopper');

      // update existing choppers' wood axes
      for (let i = 0; i < choppers.length; i++) {
        choppers[i].inventory.items['wood-axe'].rank++;
      }
    },
  },
  'chopper-speed': {
    count: 0,
    basePrice: 25,
    multiplier: 2.9,
    max: 10,
    buyCallback: function() {
      const choppers = getGame().groups.character.children.filter((o) => o.objectType === 'chopper');

      for (let i = 0; i < choppers.length; i++) {
        choppers[i].speed -= 0.1;
        choppers[i].timer.events[0].delay -= 100;
      }
    },
  },

  // collector upgrades
  'collector-speed': {
    count: 0,
    basePrice: 50,
    multiplier: 1.73,
    max: 10,
    buyCallback: function() {
      const collectors = getGame().groups.character.children.filter((o) => o.objectType === 'collector');

      for (let i = 0; i < collectors.length; i++) {
        collectors[i].speed -= 0.1;
        collectors[i].timer.events[0].delay -= 100;
      }
    },
  },
};

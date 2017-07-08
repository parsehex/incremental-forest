import Worker from '../Worker';
import store from '../../../game-data/store';

import doWork from './do-work';

export default class extends Worker {
  constructor({ game, x, y }) {
    super(game, x, y, 'worker-chopper', null, 'chopper');

    this.inventory = {
      selected: 'wood-axe',
      items: {
        'wood-axe': {
          rank: store['chopper-wood-axe'].count,
        },
      },
    };

    this.targetObjects = ['tree'];

    this.doWork = doWork.bind(this);
  }

  resetObject() {
    super.resetObject();

    this.inventory = {
      selected: 'wood-axe',
      items: {
        'wood-axe': {
          rank: store['chopper-wood-axe'].count,
        },
      },
    };
  }
}

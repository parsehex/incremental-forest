import Worker from '../Worker';
import { worker, getWoodAxeRank } from '../../../game-data/worker-config';

import doWork from './do-work';

export default class extends Worker {
  constructor({ game, x, y }) {
    super(game, x, y, 'worker-chopper', null, 'chopper');

    this.inventory = {
      selected: 'wood-axe',
      items: {
        'wood-axe': {
          rank: getWoodAxeRank(),
        },
      },
    };

    this.targetObjects = ['tree'];

    this.doWork = doWork.bind(this);
  }

  resetObject() {
    super.resetObject();

    this.inventory.selected = 'wood-axe';
  }
}

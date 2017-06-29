import Worker from '../Worker';

import doWork from './do-work';

export default class extends Worker {
  constructor({ game, x, y }) {
    super(game, x, y, 'worker-collector', null, 'collector');

    this.targetObjects = ['log', 'pine-cone'];

    this.doWork = doWork.bind(this);
  }
}

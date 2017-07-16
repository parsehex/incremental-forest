import Phaser from 'phaser';

import create from './create';

export default class extends Phaser.State {
  constructor() {
    super();

    this.create = create.bind(this);
  }
}

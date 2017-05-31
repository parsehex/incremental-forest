import Phaser from 'phaser';

import init from './init';
import preload from './preload';
import create from './create';

export default class Splash extends Phaser.State {
  constructor() {
    super();

    this.init = init.bind(this);
    this.preload = preload.bind(this);
    this.create = create.bind(this);
  }
}

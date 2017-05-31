import Phaser from 'phaser';

import init from './init';
import preload from './preload';
import render from './render';

export default class Boot extends Phaser.State {
  constructor() {
    super();

    this.init = init.bind(this);
    this.preload = preload.bind(this);
    this.render = render.bind(this);
  }
}

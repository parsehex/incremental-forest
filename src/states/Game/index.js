import Phaser from 'phaser';

import init from './init';
import preload from './preload';
import create from './create';
import render from './render';
import update from './update';

export default class extends Phaser.State {
  constructor() {
    super();

    this.init = init.bind(this);
    this.preload = preload.bind(this);
    this.create = create.bind(this);
    this.render = render.bind(this);
    this.update = update.bind(this);
  }
}

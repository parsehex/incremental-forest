import Phaser from 'phaser';

import CommonCharacter from '../Common';

import frames from '../../../sprite-frames';
import workerPool from '../../../worker-pool';

import tryMove from './move';
import interact from './interact';
import Inventory from './inventory';
import Cursor from './Cursor';
import hireWorker from './hire-worker';
import fireWorker from './fire-worker';

export default class extends CommonCharacter {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN, 'player', 'player');

    this.faceDirection = 'DOWN';
    this.faceObjects = [];

    this.inventory = new Inventory(this.game);

    this.cursor = new Cursor(this);

    this.hireWorker = hireWorker.bind(this);
    this.fireWorker = fireWorker.bind(this);

    this.interacting = false;
    this.interactAction = null;
    this.lastInteractedTile = null;

    workerPool.register();

    this.controls = {
      move: tryMove.bind(this),
      interact: interact.bind(this),
    };

    // i'll leave this here to be remembered for later
    // this.axe = new Phaser.Image(
    //   this.game,
    //   15,
    //   -15,
    //   'axe'
    // );
    // this.addChild(this.axe);
    // this.axe.scale.x = 0.3;
    // this.axe.scale.y = 0.3;
  }

  save() {
    // serialize and return any data that should be persited between sessions

    const saveState = {
      x: this.x,
      y: this.y,
      frame: this.frame,
      faceDirection: this.faceDirection,
      inventory: {
        money: {
          value: this.inventory.money.value,
        },
        items: {},
      },
    };

    const items = this.inventory.items;
    for (let itemName in items) {
      saveState.inventory.items[itemName] = {
        value: items[itemName].value,
      };
    }

    return saveState;
  }
}

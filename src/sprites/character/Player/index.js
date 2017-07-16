import Phaser from 'phaser';

import CommonCharacter from '../Common';

import frames from '../../../sprite-frames';
import workerPool from '../../../worker-pool';
import devtools from '../../../devtools';
import { save, load, saveMe } from '../../../save';

import tryMove from './move';
import interact from './interact';
import Inventory from './inventory';
import Cursor from './Cursor';
import hireWorker from './hire-worker';
import fireWorker from './fire-worker';

export default class extends CommonCharacter {
  constructor({ game, x, y }) {
    if (load('player.location')) {
      x = load('player.location').x;
      y = load('player.location').y;
    }
    const faceDirection = load('player.face-direction') || 'DOWN';

    super(game, x, y, 'guy', frames.GUY['STAND_' + faceDirection], 'player', 'player');

    this.faceDirection = faceDirection;

		this.speed = devtools.enabled ? devtools.playerSpeed : 10;

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

    saveMe(this.saveState.bind(this));
  }

  saveState() {
    save('player.location', { x: this.x, y: this.y });
    save('player.face-direction', this.faceDirection);
  }
}

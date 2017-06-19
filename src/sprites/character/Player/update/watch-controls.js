import Phaser from 'phaser';

import { num, directionToWASD } from '../../../../utils';

export default function(moveCallback, interactCallback) {
  const checkMove = checkMoveKeys.bind(this, moveCallback);

  // early-return if any single key is being pressed
  if (checkMove('UP')) {
    return;
  }
  if (checkMove('LEFT')) {
    return;
  }
  if (checkMove('DOWN')) {
    return;
  }
  if (checkMove('RIGHT')) {
    return;
  }

  checkKeyRecurring.call(this, interactCallback, 'SPACEBAR');

  checkKey.call(this, this.inventory.seek, 'Q', 'previous');
  checkKey.call(this, this.inventory.seek, 'E', 'next');

  for (let i = 0; i < 8; i++) {
    checkKey.call(this, function(slotNum) {
      this.inventory.select(slotNum);
    }.bind(this, i), num(i + 1));
  }

  // checkKey.call(this, this.hireWorker, 'H');
  // checkKey.call(this, this.fireWorker, 'F');

  checkKey.call(this, (arg, key) => {
    const amount = key.shiftKey ? null : 1;

    this.inventory.sell(null, amount);
  }, 'L');
}

function checkMoveKeys(callback, key) {
  const keys = this.game.state.states.Game.keys;
  const directionKey = directionToWASD(key);

  if (keys[key].isDown || keys[directionKey].isDown) {
    callback(key);
  }
}

function checkKey(callback, key, arg) {
  const keys = this.game.state.states.Game.keys;

  if (keys[key].justPressed()) {
    callback(arg, keys[key]);
  }
}

function checkKeyRecurring(callback, key, arg, time) {
  const keys = this.game.state.states.Game.keys;

  if (keys[key].justPressed()) {
    this.interacting = true;

    callback(arg, keys[key]);

    this.lastTileInteract = { x: this.cursor.tile.x, y: this.cursor.tile.y };

    // add a short delay before loop starts
    this.game.time.events.add(250, function() {
      loop.call(this, keys, key, callback, arg);
    }, this);
  }
}
function loop(keys, key, callback, arg) {
  const cursor = this.cursor;
  this.game.time.events.add(25, function() {
    if (!keys[key].isDown || this.interactAction === 'cancel') {
      // stop the loop if key is no longer down
      this.interacting = false;
      this.interactAction = null;
      this.lastTileInteract = null;

      return;
    }

    this.interacting = true;

    // callback only if cursor is not on same tile
    if (
      this.cursor.tile.x !== this.lastTileInteract.x ||
      this.cursor.tile.y !== this.lastTileInteract.y
    ) {
      callback(arg);

      this.lastTileInteract = { x: cursor.tile.x, y: cursor.tile.y };
    }

    loop.call(this, keys, key, callback, arg);
  }, this);
}

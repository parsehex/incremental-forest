import CommonObject from '../Common';
import Phaser from 'phaser';

import frames from '../../sprite-frames';

import { checkFacing } from '../Common/update/controllable';
import update from './update';
import Inventory from './inventory';

import { nextTile, tileToPixel } from '../../tiles';

export default class extends CommonObject {
  constructor({ game, x, y }) {
    super(game, x, y, 'guy', frames.GUY.STAND_DOWN, 'player');

    this.faceDirection = 'DOWN';
    this.faceObjects = [];

    this.inventory = new Inventory(this.game);

    this.update = update.bind(this);

    // run checkFacing once so that hints will show properly at game start
    this.checkFacing = checkFacing.bind(this);

    this.checkFacing();

    this.drawCursor();
  }
  
  drawCursor(nextNextTile) {
    let cursorCoord;
    if (nextNextTile) {
      cursorCoord = nextTile.call(this);
      cursorCoord = tileToPixel(nextTile(cursorCoord, this.faceDirection));
    } else {
      cursorCoord = tileToPixel(nextTile.call(this));
    }

    const fixedCoord = {
      x: cursorCoord.x - 16,
      y: cursorCoord.y - 16,
    };

    if (this.cursor) {
      const move = this.game.add.tween(this.cursor);

      move.to(fixedCoord, 50, null, true);
    } else {
      const playerGroup = this.game.state.states.Game.groups.player;
      const cursor = new Phaser.Graphics(this.game, fixedCoord.x, fixedCoord.y);

      cursor.alpha = 0.4;
      cursor.beginFill(Phaser.Color.getColor(255, 255, 255));

      cursor.drawRect(0, 0, 32, 32);
      cursor.endFill();

      playerGroup.add(cursor);
      this.cursor = cursor;

      playerGroup.sort('type', Phaser.Group.SORT_DESCENDING);
    }
  }
}

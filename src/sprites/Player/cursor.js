import Phaser from 'phaser';

import interfaceWithObjects from './interface-objects';
import { objectsAtTile } from '../../world';
import { tile, nextTile, tileToPixel } from '../../tiles';
import { nextCoord } from '../../utils';

export default function drawCursor(nextNextTile) {
  let cursorTileCoord = nextCoord(this.tile, this.faceDirection, 1);
  let cursorPixelCoord;
  if (nextNextTile) {
    let nextTileCoord = nextTile(cursorTileCoord, this.faceDirection);
    cursorPixelCoord = tileToPixel(nextTileCoord);
  } else {
    cursorPixelCoord = tileToPixel(cursorTileCoord);
  }

  cursorPixelCoord.x -= 16;
  cursorPixelCoord.y -= 16;

  if (this.cursor) {
    const objectsAtOldCursor = objectsAtTile(this.cursor.tile);

    const move = this.game.add.tween(this.cursor);

    move.to(cursorPixelCoord, 25, null, true);

    move.onComplete.add(function() {
      this.cursor.tile = tile(cursorPixelCoord);
    }, this);
  } else {
    const playerGroup = this.game.state.states.Game.groups.player;
    const cursorGraphic = new Phaser.Graphics(this.game, cursorPixelCoord.x, cursorPixelCoord.y);

    cursorGraphic.alpha = 0.2;
    cursorGraphic.beginFill(Phaser.Color.getColor(255, 255, 255));

    cursorGraphic.drawRect(0, 0, 32, 32);
    cursorGraphic.endFill();

    playerGroup.add(cursorGraphic);

    this.cursor = cursorGraphic;
    this.cursor.tile = tile(cursorPixelCoord);

    playerGroup.sort('type', Phaser.Group.SORT_DESCENDING);
  }

  if (typeof objectsAtOldCursor !== 'undefined' && objectsAtOldCursor.length > 0) {
    interfaceWithObjects(objectsAtOldCursor, 'notFacing');
  }

  const objectsAtCurrentCursor = objectsAtTile(this.cursor.tile);
  if (objectsAtCurrentCursor.length > 0) {
    interfaceWithObjects(objectsAtCurrentCursor, 'facing');
  }
}

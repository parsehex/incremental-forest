import Phaser from 'phaser';

import interfaceWithObjects from '../interface-objects';
import { objectsAtTile } from '../../../world';
import { tile, nextTile, tileToPixel } from '../../../tiles';
import { nextCoord } from '../../../utils';

export default function move(nextNextTile) {
  let cursorTileCoord = nextCoord(this.player.tile, this.player.faceDirection, 1);
  let cursorPixelCoord;
  if (nextNextTile) {
    let nextTileCoord = nextTile(cursorTileCoord, this.player.faceDirection);
    cursorPixelCoord = tileToPixel(nextTileCoord);
  } else {
    cursorPixelCoord = tileToPixel(cursorTileCoord);
  }

  cursorPixelCoord.x -= 16;
  cursorPixelCoord.y -= 16;

  const objectsAtOldCursor = this.objects;

  const move = this.game.add.tween(this.graphic);

  move.to(cursorPixelCoord, 25, null, true);

  move.onComplete.add(function() {
    this.tile = tile(cursorPixelCoord);

    const objectsAtCurrentCursor = this.objects;
    if (objectsAtCurrentCursor.length > 0) {
      interfaceWithObjects(objectsAtCurrentCursor, 'facing');
    }
  }, this);

  if (objectsAtOldCursor.length > 0) {
    interfaceWithObjects(objectsAtOldCursor, 'notFacing');
  }
}

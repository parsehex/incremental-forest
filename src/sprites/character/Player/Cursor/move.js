import Phaser from 'phaser';

import interfaceWithObjects from '../../Common/interface-objects';
import { objectsAtTile } from '../../../../world';
import { nextTile, tileToPixel } from '../../../../tiles';
import { nextCoord } from '../../../../utils';

export default function move() {
  let cursorTileCoord = nextCoord(this.player.tile, this.player.faceDirection, 1);
  let cursorPixelCoord = tileToPixel(cursorTileCoord);

  cursorPixelCoord.x -= 16;
  cursorPixelCoord.y -= 16;

  const objectsAtOldCursor = this.objects;

  const move = this.game.add.tween(this.graphic);

  move.to(cursorPixelCoord, 25, null, true);

  move.onComplete.add(function() {
    this.setTile();

    const objectsAtCurrentCursor = this.objects;
    if (objectsAtCurrentCursor.length > 0) {
      interfaceWithObjects(objectsAtCurrentCursor, 'facing', this.player);
    }

    this.showHints();
  }, this);

  if (objectsAtOldCursor.length > 0) {
    interfaceWithObjects(objectsAtOldCursor, 'notFacing', this.player);
  }
}

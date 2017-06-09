import Phaser from 'phaser';

import interfaceWithObjects from '../interface-objects';
import { tile, tileToPixel } from '../../../tiles';
import { nextCoord } from '../../../utils';

export default function draw() {
  let cursorTileCoord = nextCoord(this.player.tile, this.player.faceDirection, 1);
  let cursorPixelCoord = tileToPixel(cursorTileCoord);

  cursorPixelCoord.x -= 16;
  cursorPixelCoord.y -= 16;

  const playerGroup = this.game.state.states.Game.groups.player;
  const cursorGraphic = new Phaser.Graphics(this.game, cursorPixelCoord.x, cursorPixelCoord.y);

  cursorGraphic.lineStyle(1, Phaser.Color.getColor(244, 67, 54), 1);

  cursorGraphic.drawRect(0, 0, 32, 32);
  cursorGraphic.endFill();

  playerGroup.add(cursorGraphic);

  this.graphic = cursorGraphic;
  this.tile = tile(cursorPixelCoord);

  playerGroup.sort('type', Phaser.Group.SORT_DESCENDING);

  const objectsAtCursor = this.objects;
  if (objectsAtCursor.length > 0) {
    interfaceWithObjects(objectsAtCursor, 'facing');
  }
}

import Phaser from 'phaser';

import interfaceWithObjects from '../../Common/interface-objects';
import { tileToPixel } from '../../../../tiles';
import { nextCoord } from '../../../../utils';

export default function draw() {
  let cursorTileCoord = nextCoord(this.player.tile.x, this.player.tile.y, this.player.faceDirection, 1);
  let cursorPixelCoord = tileToPixel(cursorTileCoord.x, cursorTileCoord.y);

  cursorPixelCoord.x -= 16;
  cursorPixelCoord.y -= 16;

  const playerGroup = this.game.state.states.Game.groups.player;
  const cursorGraphic = new Phaser.Graphics(this.game, cursorPixelCoord.x, cursorPixelCoord.y);

  cursorGraphic.lineStyle(1, Phaser.Color.getColor(244, 67, 54), 1);

  cursorGraphic.drawRect(0, 0, 32, 32);
  cursorGraphic.endFill();

  playerGroup.add(cursorGraphic);

  this.graphic = cursorGraphic;
  this.setTile();

  playerGroup.sort('type', Phaser.Group.SORT_DESCENDING);

  const objectsAtCursor = this.objects;
  if (objectsAtCursor.length > 0) {
    interfaceWithObjects(objectsAtCursor, 'facing', this.player);
  }
}

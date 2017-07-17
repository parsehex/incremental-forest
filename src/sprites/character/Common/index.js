import Common from '../../Common';
import frames from '../../../sprite-frames';
import config from '../../../config';
import world from '../../../world';
import { clone, tileOutOfBounds } from '../../../utils';
import { pixelToTile } from '../../../tiles';

export default class CommonCharacter extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.character.add(this);

    world.add(this.tile.x, this.tile.y, this);
  }

  move(nextPixelCoord) {
    const nextTileCoord = pixelToTile(nextPixelCoord.x, nextPixelCoord.y);
    if (tileOutOfBounds(nextTileCoord.x, nextTileCoord.y)) return;

    if (this.cursor) {
      this.cursor.move();
    }

    const oldTileCoord = this.tile;

    super.move(nextPixelCoord, function() {
      world.move(oldTileCoord.x, oldTileCoord.y, this.tile.x, this.tile.y, this);
    });
  }

  face(direction) {
    const frameName = frames.CHARACTER['STAND_' + direction];
    this.frame = frameName;

    this.faceDirection = direction;
  }

  resetObject() {
    super.resetObject();

    world.add(this.tile.x, this.tile.y, this);
  }

  destroy() {
    world.remove(this.tile.x, this.tile.y, this);

    super.destroy();
  }
}

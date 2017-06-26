import Common from '../../Common';
import frames from '../../../sprite-frames';
import config from '../../../config';
import { addCharacter, moveCharacter, removeCharacter } from '../../../world';
import { clone, tileOutOfBounds } from '../../../utils';
import { pixelToTile } from '../../../tiles';

export default class CommonCharacter extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.character.add(this);

    addCharacter(this.tile, this.objectType);
  }

  move(nextPixelCoord) {
    const nextTileCoord = pixelToTile(nextPixelCoord);
    if (tileOutOfBounds(nextTileCoord)) return;

    if (this.cursor) {
      this.cursor.move();
    }

    const oldTileCoord = this.tile;

    super.move(nextPixelCoord, function() {
      moveCharacter(oldTileCoord, this.tile, this.objectType);
    });
  }

  face(direction) {
    const frameName = frames.CHARACTER['STAND_' + direction];
    this.frame = frameName;

    this.faceDirection = direction;
  }

  resetObject() {
    super.resetObject();

    addCharacter(this.tile, this.objectType);
  }

  destroy() {
    removeCharacter(this.tile, this.objectType);

    super.destroy();
  }
}

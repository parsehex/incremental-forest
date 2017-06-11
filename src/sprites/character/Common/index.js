import Common from '../../Common';
import frames from '../../../sprite-frames';

export default class CommonCharacter extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.character.add(this);
  }

  move(nextPixelCoord) {
    if (this.cursor) {
      this.cursor.move();
    }

    super.move(nextPixelCoord);
  }

  face(direction) {
    const frameName = frames.CHARACTER['STAND_' + direction];
    this.frame = frameName;

    this.faceDirection = direction;
  }
}

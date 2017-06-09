import { objectsAtTile } from './world';
import { pixelToTile } from './tiles';

export default function checkCollide(pixelCoord) {
  const { x, y } = pixelCoord;
  const { bounds } = this.game.world;

  // check if next coord is out of bounds
  if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
    return {
      collides: true,
      objects: [],
    };
  }

  const tileCoord = pixelToTile(pixelCoord);
  const objects = objectsAtTile(tileCoord);

  for (let i = 0, len = objects.length; i < len; i++) {
    if (objects[i].collides !== false) {
      return {
        collides: true,
        objects,
      };
    }
  }

  return {
    collides: false,
    objects,
  };
}

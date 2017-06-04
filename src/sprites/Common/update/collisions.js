import { objectsAtTile } from '../../../world';
import { pixelToTile } from '../../../tiles';

export function checkCollide(pixelCoord) {
  if (
    pixelCoord.x < 0 || pixelCoord.x > this.game.world.bounds.width ||
    pixelCoord.y < 0 || pixelCoord.y > this.game.world.bounds.height
  ) {
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

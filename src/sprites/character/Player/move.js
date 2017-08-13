import { nextCoord } from '../../../utils';
import checkCollide from '../../../collisions';

import devtools from '../../../devtools';

import interfaceWithObjects from '../Common/interface-objects';

export default function tryMove(direction) {
  if (this.moving) return;

  this.face(direction);

  const nextPixelCoord = nextCoord(this.x, this.y, direction, 32);

  const collisions = checkCollide(nextPixelCoord.x, nextPixelCoord.y, this.id);

  if (collisions.collides === false || (devtools.enabled && devtools.noclip)) {
    interfaceWithObjects(collisions.objects, 'collide', this);

    this.move(nextPixelCoord);
  } else {
    this.cursor.move(this);
  }
}

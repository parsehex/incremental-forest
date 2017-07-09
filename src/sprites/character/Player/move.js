import { nextCoord } from '../../../utils';
import checkCollide from '../../../collisions';
import { pixelToTile } from '../../../tiles';

import devtools from '../../../devtools';

import interfaceWithObjects from '../Common/interface-objects';

export default function tryMove(direction) {
  if (this.moving) return;

  this.face(direction);

  const nextPixelCoord = nextCoord({ x: this.x, y: this.y }, direction, this.speed);

  const collisions = checkCollide.call(this, nextPixelCoord);

  if (collisions.collides === false || (devtools.enabled && devtools.noclip)) {
    interfaceWithObjects(collisions.objects, 'collide', this);

    this.move(nextPixelCoord);
  } else {
    this.cursor.move();
  }
}
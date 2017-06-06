import { nextCoord } from '../../../utils';
import checkCollide from '../../../collisions';
import { tile } from '../../../tiles';
import frames from '../../../sprite-frames';

import interfaceWithObjects from '../interface-objects';

export default function tryMove(direction) {
  if (this.moving) return;

  const frameName = 'STAND_' + direction;
  this.frame = frames.GUY[frameName];

  this.faceDirection = direction;

  const nextPixelCoord = nextCoord({ x: this.x, y: this.y }, direction, 32);

  const collisions = checkCollide.call(this, nextPixelCoord);

  if (collisions.collides === false) {
    interfaceWithObjects(collisions.objects, 'collide');

    this.move(nextPixelCoord);
  } else {
    this.drawCursor();
  }
}

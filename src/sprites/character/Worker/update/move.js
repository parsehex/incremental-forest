import { nextCoord } from '../../../../utils';

export default function move(direction) {
  if (this.moving) return;

  this.face(direction);

  const nextPixelCoord = nextCoord(this.x, this.y, direction, 32);

  this.move(nextPixelCoord);
}

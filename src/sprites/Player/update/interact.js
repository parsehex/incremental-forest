import { objectsAtTile } from '../../../world';
import interfaceWithObjects from '../interface-objects';

export default function tryInteract() {
  // interact with all listening objects under cursor
  const facingObjects = objectsAtTile(this.cursor.tile);

  if (facingObjects.length > 0) {
    interfaceWithObjects(facingObjects, 'interact');
  }
}

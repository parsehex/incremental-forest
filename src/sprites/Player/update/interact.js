import interfaceWithObjects from '../interface-objects';

export default function tryInteract() {
  // interact with all listening objects under cursor
  const facingObjects = this.cursor.objects;

  if (facingObjects.length > 0) {
    interfaceWithObjects(facingObjects, 'interact');
  }
}

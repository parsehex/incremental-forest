import interfaceWithObjects from '../../Common/interface-objects';

export default function tryInteract() {
  const { cursor, inventory } = this;

  const cursorObjects = cursor.objects;

  if (cursorObjects.length > 0) {
    interfaceWithObjects(cursorObjects, 'interact');
  } else {
    // no objects under cursor; if selected item is placeable, place it
    const selectedItem = inventory.items[inventory.selected];

    if (selectedItem.hasOwnProperty('place') && selectedItem.value > 0) {
      const Item = selectedItem.place;
      const placedItem = new Item({
        game: this.game,
        x: cursor.graphic.x + 16,
        y: cursor.graphic.y + 16,
      });

      selectedItem.value--;

      if (placedItem.hasOwnProperty('place')) placedItem.place();
    }
  }
}

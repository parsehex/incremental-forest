import interfaceWithObjects from '../../Common/interface-objects';
import { pixelToTile } from '../../../../tiles';
import { tileOutOfBounds } from '../../../../utils';

export default function tryInteract() {
  const { cursor, inventory } = this;

  if (tileOutOfBounds(cursor.tile)) return;

  const cursorObjects = cursor.objects;

  if (cursorObjects.length > 0) {
    interfaceWithObjects(cursorObjects, 'interact', this);
  } else {
    // no objects under cursor; if selected item is placeable, place it
    const selectedItem = inventory.items[inventory.selected];

    if (selectedItem && selectedItem.value > 0 && selectedItem.hasOwnProperty('place')) {

      if (tileOutOfBounds(pixelToTile({ x: cursor.graphic.x, y: cursor.graphic.y }))) return; // TODO bandaid fix

      const Item = selectedItem.place;
      const placedItem = new Item({
        game: this.game,
        x: cursor.graphic.x + 16,
        y: cursor.graphic.y + 16,
        placed: true,
      });

      selectedItem.value--;

      if (placedItem.hasOwnProperty('place')) placedItem.place(this);
    }
  }
}

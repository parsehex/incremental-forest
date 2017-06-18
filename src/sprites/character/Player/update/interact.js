import interfaceWithObjects from '../../Common/interface-objects';
import { pixelToTile } from '../../../../tiles';
import { tileOutOfBounds } from '../../../../utils';

export default function tryInteract() {
  const { cursor, inventory } = this;

  if (!this.interacting || tileOutOfBounds(cursor.tile)) return;

  const cursorObjects = cursor.objects;

  if (this.interactAction === null) {
    if (cursorObjects.length > 0) {
      this.interactAction = 'interacting';
    } else if (inventory.selected !== null) {
      this.interactAction = 'using item';
    } else {
      // player is picking up items
      this.interactAction = 'interacting';
    }
  }

  if (this.interactAction === 'interacting') {
    interfaceWithObjects(cursorObjects, 'interact', this);
  } else if (this.interactAction === 'using item') {
    // no objects under cursor; if selected item is placeable, place it
    const selectedItem = inventory.items[inventory.selected];

    if (!selectedItem || !selectedItem.hasOwnProperty('place')) return;

    // ensure that there are no objects under cursor before placing
    if (cursorObjects.length > 0) return;

    if (selectedItem.value > 0) {
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

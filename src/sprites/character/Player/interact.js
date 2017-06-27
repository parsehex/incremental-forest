import interfaceWithObjects from '../Common/interface-objects';
import { pixelToTile } from '../../../tiles';
import { fastMap } from '../../../world';
import { tileOutOfBounds } from '../../../utils';
import objectPool from '../../../object-pool';

export default function tryInteract() {
  const { cursor, inventory } = this;

  if (tileOutOfBounds(cursor.tile)) return;

  const cursorObjects = cursor.objects;
  const cursorObjectTypes = fastMap[cursor.tile.y][cursor.tile.x];
  const selectedItem = inventory.selected;

  if (selectedItem === 'wood-axe' && cursorObjectTypes.includes('tree')) {
    interfaceWithObjects(cursorObjects, 'interact', this);
  } else {
    const lastTile = this.lastInteractedTile;
    if (lastTile !== null && lastTile.x === cursor.tile.x && lastTile.y === cursor.tile.y) return;

    if (cursorObjects.length > 0) {
      interfaceWithObjects(cursorObjects, 'interact', this);

      this.lastInteractedTile = Object.assign({}, cursor.tile);
    } else {
      placeItem.call(this);

      this.lastInteractedTile = Object.assign({}, cursor.tile);
    }
  }
}

function placeItem() {
  const { cursor, inventory } = this;

  const selectedItem = inventory.items[inventory.selected];

  if (!selectedItem || !selectedItem.hasOwnProperty('place')) return;

  if (selectedItem.value > 0) {
    if (tileOutOfBounds(pixelToTile({ x: cursor.graphic.x, y: cursor.graphic.y }))) return; // TODO bandaid fix

    const Item = selectedItem.place;
    const placedItem = objectPool.new(inventory.selected, Item, {
      game: this.game,
      x: cursor.graphic.x + 16,
      y: cursor.graphic.y + 16,
      placed: true,
    });

    selectedItem.value--;

    if (placedItem.hasOwnProperty('place')) placedItem.place(this);
  }
}

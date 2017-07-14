import interfaceWithObjects from '../Common/interface-objects';
import { pixelToTile, tileToPixel } from '../../../tiles';
import { fastMap } from '../../../world';
import { tileOutOfBounds } from '../../../utils';
import objectPool from '../../../object-pool';

const modes = { INTERACT: 0, PICK: 1, PLACE: 2 };

export default function tryInteract() {
  const { cursor, inventory } = this;

  if (tileOutOfBounds(cursor.tile.x, cursor.tile.y)) return;

  const cursorObjects = cursor.objects;
  const cursorObjectTypes = fastMap[cursor.tile.y][cursor.tile.x];
  const selectedItem = inventory.selected;

  const mode = getMode.call(this);

  if (mode === modes.INTERACT && selectedItem === 'wood-axe' && cursorObjectTypes.includes('tree')) {
    interfaceWithObjects(cursorObjects, 'interact', this);
    return;
  }

  // don't interact on same tile we just interacted with
  const lastTile = this.lastInteractedTile;
  if (lastTile !== null && lastTile.x === cursor.tile.x && lastTile.y === cursor.tile.y) return;

  if (mode === modes.PICK && cursorObjects.length > 0) {
    interfaceWithObjects(cursorObjects, 'interact', this);

    this.lastInteractedTile = Object.assign({}, cursor.tile);
    return;
  }
  if (mode === modes.PLACE && cursorObjects.length === 0) {
    placeItem.call(this);

    this.lastInteractedTile = Object.assign({}, cursor.tile);
    return;
  }
}

function getMode() {
  const { cursor, inventory } = this;
  // mode is already set, return that
  if (this.interactMode) return this.interactMode;

  const selectedItemName = inventory.selected;

  const noItemSelected = selectedItemName === null;
  const holdingPlaceableItem = !noItemSelected && inventory.get(selectedItemName, 'place');
  const facingPickableObject = cursor.objects.length && cursor.objects[0].hasOwnProperty('place');

  if (noItemSelected || facingPickableObject) {
    this.interactMode = modes.PICK;
    return modes.PICK;
  }
  if (holdingPlaceableItem) {
    // placeable itme is selected
    this.interactMode = modes.PLACE;
    return modes.PLACE;
  }

  this.interactMode = modes.INTERACT;
  return modes.INTERACT;
}

function placeItem() {
  const { cursor, inventory } = this;

  const item = inventory.get.bind(inventory, inventory.selected);

  if (!inventory.selected || !item('place')) return;

  if (item() > 0) {
    const pixelCoord = tileToPixel(cursor.tile.x, cursor.tile.y);
    const tileCoord = pixelToTile(pixelCoord.x, pixelCoord.y);

    if (tileOutOfBounds(tileCoord.x, tileCoord.y)) return;

    const Item = item('place');
    const placedItem = objectPool.new(inventory.selected, Item, {
      game: this.game,
      x: pixelCoord.x,
      y: pixelCoord.y,
      placed: true,
    });

    inventory.set(inventory.selected, 'value', item() - 1);

    if (placedItem.hasOwnProperty('place')) placedItem.place(this);
  }
}

import { indexOfObject } from '../utils';

export function add(x, y, object) {
  // add an object to the map

  this.tile(x, y).push(object);

  this._notifySubscribers(x, y, 'add');
}
export function move(fromX, fromY, toX, toY, object) {
  // move an object from one tile to a different tile

  // remove the object from previous tile and inform subscribers
  const fromTile = this.tile(fromX, fromY);
  const fromIndex = indexOfObject(fromTile, 'id', object.id);
  fromTile.splice(fromIndex, 1);

  this._notifySubscribers(fromX, fromY, 'moveFrom');

  // add object to new tile and inform subscribers
  this.tile(toX, toY).push(object);

  this._notifySubscribers(toX, toY, 'moveTo');
}
export function remove(x, y, object) {
  // remove an object from the map

  const tile = this.tile(x, y);
  const tileIndex = indexOfObject(tile, 'id', object.id);
  tile.splice(tileIndex, 1);

  this._notifySubscribers(x, y, 'remove');
}

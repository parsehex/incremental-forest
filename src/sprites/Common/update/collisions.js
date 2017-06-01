// returns either:
  // false if there's no colliding object at coord
  // null if there's water at coord
  // the colliding object at coord
export function checkCollide(coord) {
  const map = this.game.state.states.Game.map;

  const nextTile = map.getTileWorldXY(coord.x, coord.y, map.tileWidth, map.tileHeight, 'foreground');

  // if nextTile is null, there is no foreground tile at nextTile (i.e. water is at this tile)
  if (nextTile === null) return null;

  let collision = false;
  let collidingObject = false;

  // loop through objects in the world
  this.game.world.forEach(function(object) {
    // ignore objects with no key (layers) and the player
    if (collidingObject !== false || !object.key || object.key === 'guy') return;

    const {
      top,
      left,
      bottom,
      right,
    } = object;

    const withinX = coord.x <= right && coord.x >= left;
    const withinY = coord.y <= bottom && coord.y >= top;

    if (withinX && withinY) {
      collidingObject = object;
    }
  });
  return collidingObject;
}

export const NO_COLLISION = false;
export const WATER_COLLISION = null;

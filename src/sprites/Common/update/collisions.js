// returns either:
  // false (NO_COLLISION) if there's no colliding object at coord
  // the colliding object at coord
export function checkCollide(coord) {
  let collision = NO_COLLISION;

  if (
    coord.x < 0 || coord.x > this.game.world.bounds.width ||
    coord.y < 0 || coord.y > this.game.world.bounds.height
  ) {
    return WORLD_COLLISION;
  }

  // loop through objects in the world
  this.game.world.forEach(function(object) {
    // ignore objects with no key (layers) and the player
    if (collision !== false || !object.key || object.key === 'guy') return;

    const {
      top,
      left,
      bottom,
      right,
    } = object;

    const withinX = coord.x <= right && coord.x >= left;
    const withinY = coord.y <= bottom && coord.y >= top;

    if (withinX && withinY) {
      collision = object;
    }
  });
  return collision;
}

export const NO_COLLISION = false;
export const WORLD_COLLISION = null;

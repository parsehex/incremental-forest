import frames from '../../../sprite-frames';
import { centerOfObject } from '../../../utils';
import objectPool from '../../../object-pool';

import Tree from '../../../sprites/object/Tree';
import Water from '../../../sprites/object/Water';

export default function addObjects() {
  // TODO is this object used (outside of this script)?
  this.objects = {
    trees: [],
    water: [],
  };

  objects = objects.bind(this);

  objects('trees', 'tree', Tree);
  objects('water', 'water', Water);
}

function objects(name, objectType, objectClass) {
  const arr = this.map.objects[name];
  for (let i = 0, len = arr.length; i < len; i++) {
    const start = centerOfObject(arr[i], this.map);

    const object = objectPool.new(objectType, objectClass, {
      game: this.game,
      x: start.x,
      y: start.y,
    });

    this.objects[name].push(object);
  }
}

import frames from '../../../sprite-frames';
import { centerOfObject } from '../../../utils';

import Tree from '../../../sprites/Tree';
import Water from '../../../sprites/Water';

export default function addObjects() {
  // TODO is this object used (outside of this script)?
  this.objects = {
    trees: [],
    water: [],
  };

  objects = objects.bind(this);

  objects('trees', Tree);
  objects('water', Water);
}

function objects(name, objectClass) {
  const arr = this.map.objects[name];
  for (let i = 0, len = arr.length; i < len; i++) {
    const start = centerOfObject(arr[i], this.map);

    const object = new objectClass({
      game: this.game,
      x: start.x,
      y: start.y,
    });

    this.objects[name].push(object);
  }
}

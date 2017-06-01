import frames from '../../../sprite-frames';
import { centerOfObject } from '../../../utils';

import Tree from '../../../sprites/Tree';
import Generator from '../../../sprites/Generator';
import Water from '../../../sprites/Water';

export default function addObjects() {
  this.objects = {
    trees: [],
    generators: [],
    water: [],
  };

  objects = objects.bind(this);

  objects('trees', Tree);
  objects('generators', Generator);
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

    this.game.add.existing(object);
  }
}

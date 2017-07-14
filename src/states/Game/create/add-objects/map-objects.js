import objectPool from '../../../../object-pool';
import { centerOfObject } from '../../../../utils';

export default function loadFromMap() {
  objects.call(this, 'trees', 'tree', Tree);
  objects.call(this, 'water', 'water', Water);
}

function objects(name, objectType, objectClass) {
  const objArr = this.map.objects[name];
  for (let i = 0, len = objArr.length; i < len; i++) {
    const start = centerOfObject(objArr[i], this.map);

    const object = objectPool.new(objectType, objectClass, {
      game: this.game,
      x: start.x,
      y: start.y,
    });
  }
}

import frames from '../../../sprite-frames';
import { centerOfObject } from '../../../utils';
import { tileToPixel } from '../../../tiles';
import objectPool from '../../../object-pool';
import config from '../../../config';
import { load } from '../../../save';

import Tree from '../../../sprites/object/Tree';
import PineCone from '../../../sprites/object/PineCone';
import Log from '../../../sprites/object/Log';
import Water from '../../../sprites/object/Water';

import Chopper from '../../../sprites/character/Chopper';
import Collector from '../../../sprites/character/Collector';

const objectTypes = {
  tree: Tree,
  'pine-cone': PineCone,
  log: Log,
  water: Water,
  chopper: Chopper,
  collector: Collector,
};

export default function addObjects() {
  objects = objects.bind(this);

  const fastMap = load('world.fastMap');
  if (fastMap) {
    // load the previous world state
    for (let y = 0; y < config.mapHeight; y++) {
      for (let x = 0; x < config.mapWidth; x++) {
        if (fastMap[y][x].length === 0) continue;

        for (let i = 0; i < fastMap[y][x].length; i++) {
          spawnObject.call(this, fastMap[y][x][i], { x, y });
        }
      }
    }
    return;
  }

  // no saved world; load world from mapfile
  objects('trees', 'tree', Tree);
  objects('water', 'water', Water);
}

function spawnObject(objectType, tileCoord) {
  if (objectType === 'player') return;

  const start = tileToPixel(tileCoord);

  const props = {
    game: this.game,
    x: start.x,
    y: start.y,
  };

  if (objectType === 'planted-pine-cone') {
    props.placed = true;
    objectType = 'pine-cone';
  }

  const object = objectPool.new(objectType, objectTypes[objectType], props);

  if (props.placed && object.hasOwnProperty('place')) object.place();
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

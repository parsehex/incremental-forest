import config from '../../../../config';
import objectPool from '../../../../object-pool';
import { load } from '../../../../save';
import { tileToPixel } from '../../../../tiles';

import Tree from '../../../../sprites/object/Tree';
import PineCone from '../../../../sprites/object/PineCone';
import Log from '../../../../sprites/object/Log';
import Water from '../../../../sprites/object/Water';
import House from '../../../../sprites/object/House';

import Chopper from '../../../../sprites/character/Chopper';
import Collector from '../../../../sprites/character/Collector';

const objectTypes = {
  tree: Tree,
  'pine-cone': PineCone,
  log: Log,
  water: Water,
  house: House,
  chopper: Chopper,
  collector: Collector,
};

export default function loadFromSave() {
  const fastMap = load('world.fastMap');

  const len = fastMap.length;
  for (let i = 0; i < len; i++) {
    // loop through each tile

    for (let k = 0; k < fastMap[i].length; k++) {
      // loop through and create each object at tile

      const y = Math.floor(i / config.mapHeight);
      const x = i - (y * config.mapHeight);

      spawnObject.call(this, fastMap[i][k], x, y);
    }
  }
}

function spawnObject(objectType, tileX, tileY) {
  if (objectType === 'player') return;

  const start = tileToPixel(tileX, tileY);

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

import addMap from './add-map';
import addPlayer from './add-player';
import addObjects from './add-objects';
import setupHUD from '../../../ui/setup';
import devtools from '../../../devtools';
import objectPool from '../../../object-pool';

// below imports are for testing
import Chopper from '../../../sprites/character/Chopper';
import {
  findObjByKey,
  centerOfObject,
} from '../../../utils';

export default function create() {
  this.hud = {
    hint: null,
    water: null,
  };

  this.groups = {
    map: this.game.add.group(),
    objects: this.game.add.group(),
    player: this.game.add.group(),
    character: this.game.add.group(),
  };

  addMap.call(this);

  addObjects.call(this);
  addPlayer.call(this);

  this.input.destroy();

  setupHUD.call(this);

  if (devtools.enabled && devtools.testMapWorker) {
    const workerStartObj = findObjByKey(this.map.objects.objects, 'name', 'workerStart');

    const workerStart = centerOfObject(workerStartObj, this.map);

    objectPool.new('chopper', Chopper, {
      game: this.game,
      x: workerStart.x,
      y: workerStart.y,
    });
  }

  this.game.gameTime = 0;
  this.game.stage.disableVisibilityChange = true;
}

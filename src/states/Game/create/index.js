import setupKeys from './setup-keys';
import addMap from './add-map';
import addPlayer from './add-player';
import addObjects from './add-objects';
import setupHUD from '../../../ui/setup';
import devtools from '../../../devtools';

// below imports are for testing
import Worker from '../../../sprites/character/Chopper';
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

  setupKeys.call(this);

  addMap.call(this);

  addObjects.call(this);
  addPlayer.call(this);

  setupHUD.call(this);

  if (devtools.enabled && devtools.testMapWorker) {
    const workerStartObj = findObjByKey(this.map.objects.objects, 'name', 'workerStart');

    const workerStart = centerOfObject(workerStartObj, this.map);

    this.worker = new Worker({
      game: this.game,
      x: workerStart.x,
      y: workerStart.y,
    });
  }

  this.game.gameTime = 0;
  this.game.stage.disableVisibilityChange = true;
}

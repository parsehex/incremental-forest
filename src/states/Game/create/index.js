import setupKeys from './setup-keys';
import addMap from './add-map';
import addPlayer from './add-player';
import addObjects from './add-objects';
import setupHUD from './setup-hud';

export default function create() {
  this.hud = {
    hint: null,
    water: null,
  };

  setupKeys.call(this);

  addMap.call(this);

  addObjects.call(this);
  addPlayer.call(this);

  setupHUD();
}

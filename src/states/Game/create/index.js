import addMap from './add-map';
import addObjects from './add-objects';
import addPlayer from './add-player';
import setupKeys from './setup-keys';

export default function create() {
  this.hud = {
    hint: null,
  };

  setupKeys.call(this);

  addMap.call(this);

  addPlayer.call(this);
  addObjects.call(this);
}

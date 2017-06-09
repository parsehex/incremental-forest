import setupKeys from './setup-keys';
import addMap from './add-map';
import addPlayer from './add-player';
import addObjects from './add-objects';
import setupHUD from '../../../ui/setup';

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
}

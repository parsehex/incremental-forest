import Player from '../../../sprites/Player';
import {
  findObjByKey,
  centerOfObject,
} from '../../../utils';
import frames from '../../../sprite-frames';

export default function addPlayer() {
  const playerStartObj = findObjByKey(this.map.objects.objects, 'name', 'playerStart');

  const playerStart = centerOfObject(playerStartObj, this.map);

  this.player = new Player({
    game: this.game,
    x: playerStart.x,
    y: playerStart.y,
  });

  this.game.camera.follow(this.player);
}

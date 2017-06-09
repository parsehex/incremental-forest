import Common from '../../Common';

export default class CommonObject extends Common {
  constructor(game, x, y, sprite, frame, id, objectType) {
    super(game, x, y, sprite, frame, id, objectType);

    this.game.state.states.Game.groups.objects.add(this);
  }
}

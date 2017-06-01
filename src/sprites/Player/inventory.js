import { clamp } from '../../utils';

export default class Inventory {
  constructor(game) {
    this.game = game;

    this.waterValue = 0;
  }

  get water() { return this.waterValue; }
  set water(value) {
    this.waterValue = clamp(value, 0, 15); // clamp to 'carrying limit'
    this.game.state.states.Game.hud.water.setText('Water: ' + this.waterValue);
  }
}

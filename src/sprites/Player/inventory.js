import CommonInventory from '../Common/inventory';

export default class Inventory extends CommonInventory {
  get water() { return this.waterValue; }
  set water(value) {
    super.water = value;

    this.game.state.states.Game.hud.water.setText('Water: ' + this.water);
  }
}

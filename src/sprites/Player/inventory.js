import CommonInventory from '../Common/inventory';
import { updateInventory } from '../../ui';

export default class Inventory extends CommonInventory {
  get water() { return this.waterValue; }
  set water(value) {
    super.water = value;

    updateInventory('water', this.water);
  }
}

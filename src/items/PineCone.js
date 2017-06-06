import { tileToPixel } from '../tiles';
import PineCone from '../sprites/PineCone';

export default class PineConeItem {
  static use() {
    const player = this.state.states.Game.player;
    const cursor = player.cursor;

    const cursorObjects = cursor.objects;

    if (cursorObjects.length === 0 && player.inventory.items['pine-cone'].value > 0) {
      const { x, y } = tileToPixel(cursor.tile);

      const pineCone = new PineCone({ game: this, x, y });

      pineCone.placed();

      player.inventory.items['pine-cone'].value--;
    }
  }
}

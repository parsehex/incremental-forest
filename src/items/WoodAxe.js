export default class WoodAxeItem {
  static use() {
    const player = this.state.states.Game.player;
    const cursor = player.cursor;

    const cursorObjects = cursor.objects;
    for (let i = 0; i < cursorObjects.length; i++) {
      if (cursorObjects[i].hasOwnProperty('interact')) {
        cursorObjects[i].interact();
      }
    }
  }
}

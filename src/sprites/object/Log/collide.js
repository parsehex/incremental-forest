export default function collide() {
  const items = this.game.state.states.Game.player.inventory.items;
  
  if (!items.log.isMax) {
    items.log.value++;

    this.destroy();
  }
}

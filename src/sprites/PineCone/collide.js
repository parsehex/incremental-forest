export default function collide() {
  const player = this.game.state.states.Game.player;

  if (!player.inventory.isMax.pineCones) {
    player.inventory.items.pineCones++;

    this.destroy();
  }
}

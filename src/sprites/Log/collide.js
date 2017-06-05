export default function collide() {
  const player = this.game.state.states.Game.player;

  if (!player.inventory.isMax.logs) {
    player.inventory.items.logs++;

    this.destroy();
  }
}

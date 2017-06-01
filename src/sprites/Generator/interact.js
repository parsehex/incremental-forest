export default function interact() {
  const game = this.game.state.states.Game;

  const player = game.player;

  if (player.inventory.water > 0) {
    player.inventory.water--;
    this.water++;
  }
}

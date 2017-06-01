export default function interact() {
  const game = this.game.state.states.Game;

  const player = game.player;

  if (player.inventory.water > 0) {
    // player loses a water, generator gets a water
    player.inventory.water--;
    this.inventory.water++;
  }
}

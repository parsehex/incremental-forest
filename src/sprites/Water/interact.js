export default function interact() {
  const game = this.game.state.states.Game;

  const player = game.player;

  player.inventory.water++;
}

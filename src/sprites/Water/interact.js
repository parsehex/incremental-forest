export default function interact() {
  const game = this.game.state.states.Game;

  const player = game.player;

  player.inventory.water++;

  // this should be its own function somewhere
  game.hud.water.setText('Water: ' + player.inventory.water);
}

export default function collide() {
  this.game.state.states.Game.player.inventory.logs++;

  this.destroy();
}

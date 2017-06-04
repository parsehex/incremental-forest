export default function collide() {
  this.game.state.states.Game.player.inventory.treeSeeds++;

  this.destroy();
}

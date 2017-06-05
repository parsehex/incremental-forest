export default function collide() {
  const player = this.game.state.states.Game.player;

  if (!player.inventory.items['pine-cone'].isMax) {
    player.inventory.items['pine-cone'].value++;

    this.destroy();
  }
}

export function hireWorker(event) {
  const workerType = document.querySelector('.worker-type.selected').id;

  this.game.state.states.Game.player.hireWorker(workerType);
}

export function fireWorker(event) {
  const workerType = document.querySelector('.worker-type.selected').id;

  this.game.state.states.Game.player.fireWorker(workerType);
}

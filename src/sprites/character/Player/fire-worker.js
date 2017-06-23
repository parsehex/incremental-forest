export default function fireWorker(workerType) {
  const worker = findNearest(this.game.state.states.Game.groups.character.children, this.tile, workerType);

  if (!worker) return;

  worker.destroy();
}

export function findNearest(workers, tileCoord, workerType) {
  let closestDistance = null;
  let closestWorker = null;

  for (let i = 0; i < workers.length; i++) {
    const worker = workers[i];
    if (worker.objectType !== workerType || !worker.alive) continue;

    const yDist = Math.abs(tileCoord.y - worker.tile.y);
    const xDist = Math.abs(tileCoord.x - worker.tile.x);

    if (closestDistance > (yDist + xDist) || closestDistance === null) {
      closestDistance = yDist + xDist;
      closestWorker = worker;
    }
  }

  return closestWorker;
}

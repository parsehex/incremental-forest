import { findObjByKey } from '../../../utils';

export default function fireWorker(workerType) {
  const characters = this.game.state.states.Game.groups.character.children;

  const worker = findObjByKey(characters, 'objectType', workerType);

  if (worker) {
    worker.destroy();
  }
}

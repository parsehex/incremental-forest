import { findObjByKey } from '../../../utils';

export default function fireWorker() {
  const characters = this.game.state.states.Game.groups.character.children;

  const worker = findObjByKey(characters, 'objectType', 'worker');

  if (worker) {
    worker.destroy();
  }
}

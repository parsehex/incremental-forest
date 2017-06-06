import watchControls from './watch-controls';
import tryMoveFunc from './move';
import tryInteractFunc from './interact';

export default function update() {
  const tryMove = tryMoveFunc.bind(this);
  const tryInteract = tryInteractFunc.bind(this);

  watchControls.call(this, tryMove, tryInteract);
}

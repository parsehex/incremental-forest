import { addHint, clearHint } from '../Common/hud';

export function facing() {
  addHint.call(this, 'SPACE to interact');
}

export function notFacing() {
  clearHint.call(this);
}

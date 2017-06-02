import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('space', 'collect water');
}

export function notFacing() {
  hideHint();
}

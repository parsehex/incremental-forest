import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('space', 'chop down tree');
}

export function notFacing() {
  hideHint();
}

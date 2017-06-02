import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('space', 'power with water');
}

export function notFacing() {
  hideHint();
}

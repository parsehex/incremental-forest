import { showHint, hideHint } from '../../../ui';

export function facing() {
  showHint('water', 'space', 'collect');
}

export function notFacing() {
  hideHint();
}

import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('tree', 'space', 'chop down');
}

export function notFacing() {
  hideHint();
}

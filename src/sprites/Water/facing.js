import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('SPACE', 'interact');
}

export function notFacing() {
  hideHint();
}

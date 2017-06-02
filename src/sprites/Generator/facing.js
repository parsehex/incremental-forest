import { showHint, hideHint } from '../../ui';

export function facing() {
  showHint('generator', 'space', 'power with water');
}

export function notFacing() {
  hideHint();
}

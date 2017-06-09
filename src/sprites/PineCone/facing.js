import { showHint, hideHint } from '../../ui';

export function facing() {
  if (!this.placed) return;

  showHint('pine cone', 'space', 'pick up');
}
export function notFacing() {
  if (!this.placed) return;

  hideHint();
}

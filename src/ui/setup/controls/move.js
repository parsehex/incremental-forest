export default function move(key, direction) {
  if (!key.down || this.game.paused) return;
  this.controls.move(direction);

  if (this.moveTimerActive) return;

  this.moveTimerActive = true;

  setTimeout(() => {
    this.moveTimerActive = false;

    move.call(this, key, direction);
  }, 250);
}

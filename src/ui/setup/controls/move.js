export default function move(key, direction) {
  if (!key.down || this.game.paused) return;
  this.controls.move(direction);

  // setTimeout(move.bind(this, key, direction), 150);
}

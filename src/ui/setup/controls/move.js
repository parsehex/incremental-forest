export default function move(key, direction) {
  if (!key.down) return;
  this.controls.move(direction);

  setTimeout(move.bind(this, key, direction), 30);
}

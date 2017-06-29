export default function interact(key,) {
  if (!key.down || this.game.paused) {
    // reset last interacted tile
    this.lastInteractedTile = null;
    return;
  }

  this.controls.interact();

  setTimeout(interact.bind(this, key), 200);
}

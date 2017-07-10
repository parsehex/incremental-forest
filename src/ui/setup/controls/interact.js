export default function interact(key,) {
  if (!key.down || this.game.paused || this.stopInteract) {
    // reset last interacted tile and interact mode
    this.lastInteractedTile = null;
    this.interactMode = null;
    this.stopInteract = false;
    return;
  }

  this.controls.interact();

  setTimeout(interact.bind(this, key), 200);
}

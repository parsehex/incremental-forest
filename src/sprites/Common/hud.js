export function addHint(text) {
  const game = this.game.state.states.Game;

  game.hud.hint = this.game.add.text(
    this.game.camera.width - 100,
    this.game.camera.height - 20,
    text,
    { font: '15px Courier', fill: 'white', align: 'center', stroke: 'black', strokeThickness: 6 }
  );

  game.hud.hint.anchor.setTo(0.5, 0.5);
  game.hud.hint.fixedToCamera = true;
}

export function clearHint() {
  const game = this.game.state.states.Game;

  game.hud.hint.destroy();

  game.hud.hint = null;
}

import { drawText } from '../../ui';

export function addHint(text) {
  this.game.state.states.Game.hud.hint = drawText.call(this,
    this.game.camera.width - 175,
    this.game.camera.height - 20,
    text,
    { font: '15px Courier', fill: 'white', align: 'center', stroke: 'black', strokeThickness: 6 }
  );
}

export function clearHint() {
  const game = this.game.state.states.Game;

  game.hud.hint.destroy();

  game.hud.hint = null;
}

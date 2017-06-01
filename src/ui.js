export function drawText(x, y, text, options) {
  const drawnText = this.game.add.text(x, y, text, options);

  drawnText.anchor.setTo(0, 0.5);
  drawnText.fixedToCamera = true;

  return drawnText;
}

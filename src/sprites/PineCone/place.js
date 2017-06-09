import Phaser from 'phaser';
import Tree from '../Tree';

const chanceToGrow = 10;

export default function place() {
  this.placed = true;

  this.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
    if (this.destroyed) return;

    const number = Math.floor(Math.random() * 100) + 1;

    const playerTile = this.game.state.states.Game.player.tile;
    const thisTile = this.tile;

    if (
      chanceToGrow <= number &&
      (playerTile.x !== thisTile.x || playerTile.y !== thisTile.y)
    ) {
      new Tree({
        game: this.game,
        x: this.x,
        y: this.y,
      });

      this.destroy();
    } else {
      place.call(this);
    }
  }, this);
}

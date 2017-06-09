import Phaser from 'phaser';
import Tree from '../Tree';

const chance = 15;

export default function place() {
  this.placed = true;

  this.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
    if (this.destroyed) return;
    
    const number = Math.floor(Math.random() * 100) + 1;

    if (chance <= number) {
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

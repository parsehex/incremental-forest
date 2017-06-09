import Phaser from 'phaser';

export default function interact() {
  const game = this.game.state.states.Game;

  const player = game.player;

  if (player.inventory.water > 0) {
    // player loses a water, generator gets a water
    player.inventory.water--;
    this.inventory.water++;
    
    this.powered = true;

    // use the water
    if (this.timer === null) {
      // create the timer if null
      this.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
        this.inventory.water--;

        if (this.inventory.water <= 0) {
          // no more water
          this.timer.timer.pause();
          this.powered = false;
        }
      }, this);
    } else if (!this.timer.timer.running) {
      // timer exists but is not running; resume it
      this.timer.timer.resume();
    }
  }
}

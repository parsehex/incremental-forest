import Log from '../Log';
import PineCone from '../PineCone';

export default function interact() {
  const player = this.game.state.states.Game.player;

  new Log({
    game: this.game,
    x: this.x,
    y: this.y,
  });

  const randomNumber = Math.floor(Math.random() * 100);
  const seedChance = 25;
  if (randomNumber <= seedChance) {
    new PineCone({
      game: this.game,
      x: this.x,
      y: this.y,
    });
  }

  this.destroy();
}

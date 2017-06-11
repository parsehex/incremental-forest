import Log from '../Log';
import PineCone from '../PineCone';

export default function interact(character) {
  if (character.inventory.selected !== 'wood-axe') return;

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

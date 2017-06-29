export default function collide(character) {
  if (!character.inventory.isMax('log')) {
    character.inventory.increment('log');

    this.destroy();
  }
}

export default function collide(character) {
  if (!character.inventory.isMax('rocks')) {
    character.inventory.increment('rocks');

    this.destroy();
  }
}

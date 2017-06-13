export default function collide(character) {
  if (!character.inventory.items.log.isMax) {
    character.inventory.items.log.value++;

    this.destroy();
  }
}

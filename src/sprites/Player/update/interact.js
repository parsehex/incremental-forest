import interfaceWithObjects from '../interface-objects';

export default function tryInteract() {
  const selectedItemName = this.inventory.selected;
  const selectedItem = this.inventory.items[selectedItemName];

  selectedItem.use();
}

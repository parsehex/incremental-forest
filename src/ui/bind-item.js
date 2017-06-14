export function bindItemSlot(slotNum, inventory) {
  const slotEl = document.getElementById('item-slot-' + slotNum);

  // bind to left click
  slotEl.addEventListener('click', function() {
    inventory.select(slotNum);
  });

  // bind to right click
  slotEl.addEventListener('contextmenu', function() {
    event.preventDefault();

    inventory.sell(slotNum, 1);
  });
}

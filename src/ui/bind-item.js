export default function bindItemSlot(slotNum, inventory) {
  const slotEl = document.getElementById(`item-slot-${slotNum}`);

  // bind to left click
  slotEl.addEventListener('click', () => {
    inventory.select(slotNum);
  });

  // bind to right click
  slotEl.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const sellAmount = event.shiftKey ? null : 1;

    inventory.sell(slotNum, sellAmount);
  });
}

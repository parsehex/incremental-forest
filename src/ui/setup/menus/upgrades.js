import bindMenu from '../bind-menu';

export default function setup() {
  bindMenu('upgrades');

  upgrade('wood-axe', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price || player.inventory.items['wood-axe'].rank >= 24) return;

    updatePrice('wood-axe', 5 * Math.pow(3.5, player.inventory.items['wood-axe'].rank + 1));

    player.inventory.money.value -= price;
    player.inventory.items['wood-axe'].rank++;
  });
}

function upgrade(name, handler) {
  document.getElementById('upgrade-' + name).addEventListener('click', handler);
}

function updatePrice(name, newPrice) {
  if (Math.round(newPrice) !== newPrice) newPrice = newPrice.toFixed(2);

  const button = document.getElementById('upgrade-' + name);

  button.dataset.price = newPrice;

  button.textContent = button.textContent.replace(/\(\$.+\)/, '($' + newPrice + ')');
}

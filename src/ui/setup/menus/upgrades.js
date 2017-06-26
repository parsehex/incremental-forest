import bindMenu from '../bind-menu';
import { increaseChance } from '../../../game-data/chances';

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

  upgrade('pine-cone', (event) => {
    const price = +event.target.dataset.price;
    const upgradeNumber = +event.target.dataset.upgradeNumber || 0;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price || upgradeNumber >= 23) return;

    updatePrice('pine-cone', 5 * Math.pow(2, upgradeNumber + 1));

    player.inventory.money.value -= price;
    increaseChance('seedDrop');
    event.target.dataset.upgradeNumber = upgradeNumber + 1;
  });

  upgrade('tree-grow', (event) => {
    const price = +event.target.dataset.price;
    const upgradeNumber = +event.target.dataset.upgradeNumber || 0;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price || upgradeNumber >= 23) return;

    updatePrice('tree-grow', 15 * Math.pow(2.1, upgradeNumber + 1));

    player.inventory.money.value -= price;
    increaseChance('treeGrow');
    event.target.dataset.upgradeNumber = upgradeNumber + 1;
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

import bindMenu from '../bind-menu';
import { increaseChance } from '../../../game-data/chances';
import { getWoodAxeRank, increaseWoodAxeRank } from '../../../game-data/worker-config';

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
  upgrade('chopper-wood-axe', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;
    const choppers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'chopper');
    const chopperWoodAxeRank = getWoodAxeRank();

    if (player.inventory.money.value < price || chopperWoodAxeRank >= 24) return;

    updatePrice('chopper-wood-axe', 5 * Math.pow(3.5, chopperWoodAxeRank + 1));

    player.inventory.money.value -= price;

    // update existing choppers' wood axes
    for (let i = 0; i < choppers.length; i++) {
      choppers[i].inventory.items['wood-axe'].rank++;
    }
    // update global chopper wood axe rank
    increaseWoodAxeRank();
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

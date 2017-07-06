import setupMenu from '../../menu';
import { increaseChance } from '../../../game-data/chances';
import {
  chopper,
  collector,
  getWoodAxeRank,
  increaseWoodAxeRank,
  increaseSpeed,
} from '../../../game-data/worker-config';

import prices, { increment, count, config } from '../../../game-data/upgrade-prices';

export default function setup() {
  const inventory = this.game.state.states.Game.player.inventory;

  setupMenu('store');

  const upgradeButtons = document.querySelectorAll('.upgrade span');
  for (let i = 0; i < upgradeButtons.length; i++) {
    const itemName = upgradeButtons[i].parentNode.id.replace('upgrade-', '');

    updatePrice(itemName, prices[itemName]);

    if (inventory.money >= upgradeButtons[i].dataset.price || count(itemName) >= config[itemName]) {
      upgradeButtons[i].parentNode.classList.remove('disabled');
    } else {
      upgradeButtons[i].parentNode.classList.add('disabled');
    }
  }

  buy = buy.bind(inventory);

  upgrade('wood-axe', () => {
    if (!buy('wood-axe')) return;

    inventory.increment('wood-axe', 'rank');
  });
  upgrade('sell-price', () => {
    if (!buy('sell-price')) return;

    inventory.sellMultiplier += 0.5;
  });
  upgrade('chopper-wood-axe', () => {
    if (!buy('chopper-wood-axe')) return;

    const choppers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'chopper');

    // update existing choppers' wood axes
    for (let i = 0; i < choppers.length; i++) {
      choppers[i].inventory.items['wood-axe'].rank++;
    }
    // update global chopper wood axe rank
    increaseWoodAxeRank();
  });
  upgrade('chopper-speed', () => {
    if (!buy('chopper-speed')) return;

    const choppers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'chopper');

    for (let i = 0; i < choppers.length; i++) {
      choppers[i].speed -= 0.1;
      choppers[i].timer.events[0].delay -= 100;
    }
    increaseSpeed('chopper');
  });
  upgrade('collector-speed', () => {
    if (!buy('collector-speed')) return;

    const collectors = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'collector');

    for (let i = 0; i < collectors.length; i++) {
      collectors[i].speed -= 0.1;
      collectors[i].timer.events[0].delay -= 100;
    }
    increaseSpeed('collector');
  });

  upgrade('pine-cone', () => {
    if (!buy('pine-cone')) return;

    increaseChance('seedDrop');
  });

  upgrade('tree-grow', (event) => {
    if (!buy('tree-grow')) return;

    increaseChance('treeGrow');
  });
}

function buy(name) {
  const price = prices[name];

  if (this.money < price || count(name) >= config[name].max) return false;

  // NOTE update price before taking money so that the button will be properly
    // disabled if the player has no money for next price
  updatePrice(name, increment(name));
  this.money -= price;

  return true;
}

function upgrade(name, handler) {
  document.getElementById('upgrade-' + name).addEventListener('click', handler);
}

function updatePrice(name, newPrice) {
  const button = document.querySelector('#upgrade-' + name + ' span');

  if (count(name) >= config[name]) {
    // item is maxed out; disable button
    button.parentNode.classList.add('disabled');
  }

  if (Math.round(newPrice) !== newPrice) newPrice = newPrice.toFixed(2);

  button.dataset.price = newPrice;

  button.textContent = button.textContent.replace(/\(\$.+\)/, '($' + newPrice + ')');
}

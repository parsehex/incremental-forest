import bindMenu from '../bind-menu';
import { increaseChance } from '../../../game-data/chances';
import {
  chopper,
  collector,
  getWoodAxeRank,
  increaseWoodAxeRank,
  increaseSpeed,
} from '../../../game-data/worker-config';

export default function setup() {
  bindMenu('upgrades');

  upgrade('wood-axe', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price || player.inventory.items['wood-axe'].rank >= 24) return;

    updatePrice('wood-axe', 14 * Math.pow(2, player.inventory.items['wood-axe'].rank + 1));

    player.inventory.money.value -= price;
    player.inventory.items['wood-axe'].rank++;
  });
  upgrade('sell-price', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price) return;

    updatePrice('sell-price', 12 * Math.pow(5.5, player.inventory.sellMultiplier));

    player.inventory.money.value -= price;
    player.inventory.sellMultiplier += 0.1;
  });
  upgrade('chopper-wood-axe', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;
    const choppers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'chopper');
    const chopperWoodAxeRank = getWoodAxeRank();

    if (player.inventory.money.value < price || chopperWoodAxeRank >= 24) return;

    updatePrice('chopper-wood-axe', 14 * Math.pow(2, chopperWoodAxeRank + 1));

    player.inventory.money.value -= price;

    // update existing choppers' wood axes
    for (let i = 0; i < choppers.length; i++) {
      choppers[i].inventory.items['wood-axe'].rank++;
    }
    // update global chopper wood axe rank
    increaseWoodAxeRank();
  });
  upgrade('chopper-speed', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;
    const choppers = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'chopper');
    const chopperSpeed = chopper.speed;

    if (player.inventory.money.value < price || chopperSpeed <= 0.5) return;

    updatePrice('chopper-speed', 5 * Math.pow(3.1, (1.5 - (chopperSpeed - 0.1)) * 10));

    player.inventory.money.value -= price;

    // update existing choppers' wood axes
    for (let i = 0; i < choppers.length; i++) {
      choppers[i].speed -= 0.1;
      choppers[i].timer.events[0].delay -= 100;
    }
    // update global chopper wood axe rank
    increaseSpeed('chopper');
  });
  upgrade('collector-speed', (event) => {
    const price = +event.target.dataset.price;
    const player = this.game.state.states.Game.player;
    const collectors = this.game.state.states.Game.groups.character.children.filter((o) => o.objectType === 'collector');
    const collectorSpeed = collector.speed;

    if (player.inventory.money.value < price || collectorSpeed <= 0.5) return;

    updatePrice('collector-speed', 5 * Math.pow(3.1, (1.5 - (collectorSpeed - 0.1)) * 10));

    player.inventory.money.value -= price;

    // update existing collectors' wood axes
    for (let i = 0; i < collectors.length; i++) {
      collectors[i].speed -= 0.1;
      collectors[i].timer.events[0].delay -= 100;
    }
    // update global collector wood axe rank
    increaseSpeed('collector');
  });

  upgrade('pine-cone', (event) => {
    const price = +event.target.dataset.price;
    const upgradeNumber = +event.target.dataset.upgradeNumber || 0;
    const player = this.game.state.states.Game.player;

    if (player.inventory.money.value < price || upgradeNumber >= 18) return;

    updatePrice('pine-cone', 5 * Math.pow(1.35, upgradeNumber + 1));

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

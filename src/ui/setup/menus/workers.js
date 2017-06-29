import bindMenu from '../bind-menu';
import {
  chopper,
  collector,
  increment,
  decrement,
  count,
} from '../../../game-data/worker-config';

const workers = { chopper, collector };

export default function setup() {
  bindMenu('workers');

  workerType.call(this, 'chopper');
  workerType.call(this, 'collector');
}

function workerType(name) {
  const player = this.game.state.states.Game.player;

  document.getElementById(name).addEventListener('click', () => {
    const lastSelected = document.querySelector('.worker-type.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });

  updatePrice(name, workers[name].deposit);

  document.getElementById('hire-' + name).addEventListener('click', () => {
    if (!buy.call(player.inventory, name)) return;

    player.hireWorker(name);
  });
  document.getElementById('fire-' + name).addEventListener('click', () => {
    player.fireWorker(name);

    updatePrice(name, decrement(name));
  });
}

function buy(name) {
  const price = workers[name].deposit;

  if (this.money < price) return false;

  updatePrice(name, increment(name));
  this.money -= price;

  return true;
}

function updatePrice(name, newPrice) {
  if (Math.round(newPrice) !== newPrice) newPrice = newPrice.toFixed(2);

  const button = document.getElementById('hire-' + name);

  button.dataset.price = newPrice;

  button.textContent = button.textContent.replace(/\(\$.+\)/, '($' + newPrice + ')');
}

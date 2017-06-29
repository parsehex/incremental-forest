import bindMenu from './bind-menu';

export default function setupButtons() {
  bindMenu('workers');
  bindMenu('debt');

  // worker types
  workerType.call(this, 'chopper');
  workerType.call(this, 'collector');
  workerType.call(this, 'planter');
}

function workerType(name) {
  document.getElementById(name).addEventListener('click', () => {
    const lastSelected = document.querySelector('.worker-type.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });

  document.getElementById('hire-' + name).addEventListener('click', () => {
    this.game.state.states.Game.player.hireWorker(name);
  });
  document.getElementById('fire-' + name).addEventListener('click', () => {
    this.game.state.states.Game.player.fireWorker(name);
  });
}

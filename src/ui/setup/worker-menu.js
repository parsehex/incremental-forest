export default function setupButtons() {
  bindMenu.call(this, 'workers');

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
function bindMenu(name) {
  const menuEl = document.getElementById(name + '-menu');

  document.getElementById(name).addEventListener('click', () => {
    menuEl.classList.toggle('hidden');
  });

  const menuButtons = menuEl.querySelectorAll('button');

  for (let i = 0; i < menuButtons.length; i++) {
    let listener;

    switch (menuButtons[i].id) {
      case 'hire-worker': {
        listener = () => { this.player.hireWorker(); };
        break;
      }
      case 'fire-worker': {
        listener = () => { this.player.fireWorker(); };
        break;
      }
    }

    if (!listener) return;

    menuButtons[i].addEventListener('click', listener);
  }
}

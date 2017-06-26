export default function setupKeys() {
  setupPause.call(this);

  watchKeys.call(this);
}

let holdingKey = false;
function watchKeys() {
  document.body.addEventListener('keydown', (event) => {
    if (holdingKey) return;
    holdingKey = true;

    if (event.which === 80) { // P
      pause.call(this, 'toggle', true);
    } else if (event.which === 72) { // H
      const workerType = document.querySelector('.worker-type.selected').id;

      this.game.state.states.Game.player.hireWorker(workerType);
    } else if (event.which === 70) { // F
      const workerType = document.querySelector('.worker-type.selected').id;

      this.game.state.states.Game.player.fireWorker(workerType);
    }
  });
  document.body.addEventListener('keyup', () => {
    holdingKey = false;
  });
}

function setupPause() {
  // button and onUnfocus
  const pauseButton = document.getElementById('pause-button');

  pauseButton.addEventListener('click', pause.bind(this, 'toggle', true));

  var hidden, visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChange, () => {
    if (this.game.manuallyPaused) return;

    if (document[hidden]) {
      pause.call(this, true); // force pause
    } else {
      pause.call(this, false); // force resume
    }
  }, false);
}
function pause(state, manual) {
  if (state === 'toggle') {
    this.game.paused = !this.game.paused;
  } else if (typeof state === 'boolean') {
    this.game.paused = state;
  }

  this.game.manuallyPaused = manual && this.game.paused;

  document.getElementById('pause-button').textContent = this.game.paused ? 'Resume' : 'Pause';
}

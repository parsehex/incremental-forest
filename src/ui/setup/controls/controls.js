import { pause } from './pause';
import move from './move';
import interact from './interact';
import { hireWorker, fireWorker } from './worker';

export default function handleKeyChange(buttons, keysList, changedKey) {
  if (this.game.paused && changedKey !== buttons.pause) return;

  const player = this.game.state.states.Game.player;
  const key = keysList[changedKey];

  switch (changedKey) {
    case buttons.up: {
      if (!key.down) break;

      move.call(player, key, 'UP');
      break;
    }
    case buttons.left: {
      if (!key.down) break;

      move.call(player, key, 'LEFT');
      break;
    }
    case buttons.down: {
      if (!key.down) break;

      move.call(player, key, 'DOWN');
      break;
    }
    case buttons.right: {
      if (!key.down) break;

      move.call(player, key, 'RIGHT');
      break;
    }

    // SPACE: interact
    case buttons.interact: {
      if (!key.justDown) return;

      interact.call(player, key);
      break;
    }
    // L: sell
    case buttons.sell: {
      if (!key.justDown) return;

      player.inventory.sell(null, key.shift ? null : 1);
      break;
    }
    // P: pause
    case buttons.pause: {
      if (!key.justDown) break;

      pause.call(this, 'toggle', true);
      break;
    }
    // H: hire
    case buttons.hire: {
      if (!key.justDown) break;

      hireWorker.call(this, event);
      break;
    }
    // F: fire
    case buttons.fire: {
      if (!key.justDown) break;

      fireWorker.call(this, event);
      break;
    }
    // Q: prev item
    case buttons.prev: {
      if (!key.justDown) break;

      player.inventory.seek(-1);
      break;
    }
    // E: next item
    case buttons.next: {
      if (!key.justDown) break;

      player.inventory.seek(1);
      break;
    }

    // 1-8: select item
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56: {
      if (!key.justDown) break;

      player.inventory.select(event.key - 1);
      break;
    }
  }
}

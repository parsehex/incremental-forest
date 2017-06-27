import { pause } from './pause';
import move from './move';
import interact from './interact';
import { hireWorker, fireWorker } from './worker';

export default function handleKeyChange(keysList, changedKey) {
  const player = this.game.state.states.Game.player;
  const key = keysList[changedKey];

  switch (changedKey) {
    case 87: {
      if (!key.down) break;

      move.call(player, key, 'UP');
      break;
    }
    case 65: {
      if (!key.down) break;

      move.call(player, key, 'LEFT');
      break;
    }
    case 83: {
      if (!key.down) break;

      move.call(player, key, 'DOWN');
      break;
    }
    case 68: {
      if (!key.down) break;

      move.call(player, key, 'RIGHT');
      break;
    }

    // SPACE: interact
    case 32: {
      if (!key.justDown) return;

      interact.call(player, key);
      break;
    }
    // L: sell
    case 76: {
      if (!key.justDown) return;

      player.inventory.sell(null, key.shift ? null : 1);
      break;
    }
    // P: pause
    case 80: {
      if (!key.justDown) break;

      pause.call(this, 'toggle', true);
      break;
    }
    // H: hire
    case 72: {
      if (!key.justDown) break;

      hireWorker.call(this, event);
      break;
    }
    // F: fire
    case 70: {
      if (!key.justDown) break;

      fireWorker.call(this, event);
      break;
    }
    // Q: prev item
    case 81: {
      if (!key.justDown) break;

      player.inventory.seek(-1);
      break;
    }
    // E: next item
    case 69: {
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

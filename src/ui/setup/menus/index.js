import setupWorkers from './workers';
import setupUpgrades from './upgrades';

export default function setup() {
  setupWorkers.call(this);
  setupUpgrades.call(this);
}

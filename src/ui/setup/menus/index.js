import setupWorkers from './workers';
import setupUpgrades from './upgrades';
import setupSettings from './settings';

export default function setup() {
  setupWorkers.call(this);
  setupUpgrades.call(this);
  setupSettings.call(this);
}

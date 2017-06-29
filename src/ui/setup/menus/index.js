import setupWorkers from './workers';
import setupUpgrades from './upgrades';
import setupSettings from './settings';
import setupAbout from './about';

export default function setup() {
  setupWorkers.call(this);
  setupUpgrades.call(this);
  setupSettings.call(this);
  setupAbout.call(this);
}

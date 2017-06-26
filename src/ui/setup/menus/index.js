import setupWorkers from './workers';
import setupUpgrades from './upgrades';
// import setupDebt from './debt';

export default function setup() {
  setupWorkers.call(this);
  setupUpgrades.call(this);
  // setupDebt.call(this);
}

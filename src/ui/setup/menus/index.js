import setupWorkers from './workers';
import setupDebt from './debt';

export default function setup() {
  setupWorkers.call(this);
  setupDebt.call(this);
}

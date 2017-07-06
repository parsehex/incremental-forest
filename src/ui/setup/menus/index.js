import setupWorkers from './workers';
import setupStore from './store';
import setupSettings from './settings';
import setupAbout from './about';

export default function setup() {
  setupWorkers.call(this);
  setupStore.call(this);
  setupSettings.call(this);
  setupAbout.call(this);
}

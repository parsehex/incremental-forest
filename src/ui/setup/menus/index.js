import setupStore from './store';
import setupSettings from './settings';

import setupMenu, { openTab, openSideTab } from '../../menu';
import { load } from '../../../save';

export default function setup() {
  const openedTabName = load('ui.tab');
  const openedSideTabName = load('ui.side-tab');
  if (openedTabName) {
    openTab(openedTabName);

    if (openedSideTabName) {
      openSideTab(openedTabName, openedSideTabName);
    }
  }

  const tabs = document.querySelectorAll('.tab:not(.side-tab)');
  for (let i = 0; i < tabs.length; i++) {
    setupMenu(tabs[i].id);
  }

  setupStore.call(this);
  setupSettings.call(this);
}

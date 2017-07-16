import { save } from '../save';

export default function setup(menuName) {
  // bind menu button + toggle other menus
  // check if menu has tabs, setup if so
  document.getElementById(menuName).addEventListener('click', () => {
    openTab(menuName);

    const sideTabEl = document.querySelector(`#${menuName}-menu .side-tab.selected`);

    save('ui.tab', menuName);
    save('ui.side-tab', sideTabEl.id);
  });

  const sideTabs = document.querySelectorAll(`#${menuName}-menu .side-tab`);
  for (let i = 0; i < sideTabs.length; i++) {
    sideTab(menuName, sideTabs[i].id);
  }
}

function sideTab(menuName, sideTabName) {
  document.getElementById(sideTabName).addEventListener('click', () => {
    openSideTab(menuName, sideTabName);

    save('ui.tab', menuName);
    save('ui.side-tab', sideTabName);
  });
}

export function openTab(tabName) {
  // get the menu that's currently open
  const lastMenu = document.querySelector('.menu:not(.hidden)');

  // close the currently open menu
  document.getElementById(lastMenu.id.replace('-menu', '')).classList.remove('selected');
  lastMenu.classList.add('hidden');

  // open the clicked menu
  document.getElementById(`${tabName}-menu`).classList.remove('hidden');
  document.getElementById(tabName).classList.add('selected');
}
export function openSideTab(menuName, sideTabName) {
  const lastButtonEl = document.querySelector(`#${menuName}-menu button.selected`);
  lastButtonEl.classList.remove('selected');

  const lastMenuEl = document.getElementById(`${lastButtonEl.id}-menu`);
  lastMenuEl.classList.add('hidden');

  const sideTabButtonEl = document.getElementById(sideTabName);
  sideTabButtonEl.classList.add('selected');

  const sideTabMenuEl = document.getElementById(`${sideTabName}-menu`);
  sideTabMenuEl.classList.remove('hidden');
}

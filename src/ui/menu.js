export default function setup(name) {
  // bind menu button + toggle other menus
  // check if menu has tabs, setup if so
  document.getElementById(name).addEventListener('click', function() {
    // get the menu that's currently open
    const lastMenu = document.querySelector('.menu:not(.hidden)');

    // close the currently open menu
    document.getElementById(lastMenu.id.replace('-menu', '')).classList.remove('selected');
    lastMenu.classList.add('hidden');

    // open the clicked menu
    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });

  const sideTabs = document.querySelectorAll('#' + name + '-menu .side-tab');
  for (let i = 0; i < sideTabs.length; i++) {
    sideTab(name, sideTabs[i]);
  }
}

function sideTab(menuName, sideTabEl) {
  sideTabEl.addEventListener('click', () => {
    const lastSelected = document.querySelector('#' + menuName + '-menu button.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(sideTabEl.id + '-menu').classList.remove('hidden');
    sideTabEl.classList.add('selected');
  });
}

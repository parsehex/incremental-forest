import bindMenu from '../bind-menu';

export default function setup() {
  bindMenu('about');

  tab.call(this, 'summary');
  tab.call(this, 'how-to-play');
  tab.call(this, 'bugs');
  tab.call(this, 'credits');
}

function tab(name) {
  document.getElementById(name).addEventListener('click', () => {
    const lastSelected = document.querySelector('#about-menu button.selected');
    lastSelected.classList.remove('selected');
    document.getElementById(lastSelected.id + '-menu').classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });
}

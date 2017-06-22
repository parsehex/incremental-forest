export default function bindMenu(name) {
  document.getElementById(name).addEventListener('click', () => {
    const lastMenu = document.querySelector('.menu:not(.hidden)');
    document.getElementById(lastMenu.id.replace('-menu', '')).classList.remove('selected');
    lastMenu.classList.add('hidden');

    document.getElementById(name + '-menu').classList.remove('hidden');
    document.getElementById(name).classList.add('selected');
  });
}

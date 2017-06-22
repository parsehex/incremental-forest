import bindMenu from '../bind-menu';

export default function setup() {
  bindMenu('debt');

  bindButtons.call(this);
}

function bindButtons() {
  document.getElementById('debt-pay-50').addEventListener('click', (event) => {
    if (event.target.classList.contains('disabled')) return;
    
    this.player.inventory.payDebt(50);
  });
  document.getElementById('debt-pay-100').addEventListener('click', (event) => {
    if (event.target.classList.contains('disabled')) return;

    this.player.inventory.payDebt(100);
  });
  document.getElementById('debt-pay-500').addEventListener('click', (event) => {
    if (event.target.classList.contains('disabled')) return;

    this.player.inventory.payDebt(500);
  });
  document.getElementById('debt-pay-1000').addEventListener('click', (event) => {
    if (event.target.classList.contains('disabled')) return;

    this.player.inventory.payDebt(1000);
  });

  document.getElementById('debt-cut').addEventListener('change', () => {
    const newCut = +document.getElementById('debt-cut').value;

    this.player.inventory.debtCut = newCut / 100;
  });
}

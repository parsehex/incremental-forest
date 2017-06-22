export default function update(money, debt) {
  money = money || +document.querySelector('#money .item-count').textContent;
  debt = debt || +document.querySelector('#debt-amt .item-count').textContent;

  const pay50 = document.getElementById('debt-pay-50');
  const pay100 = document.getElementById('debt-pay-100');
  const pay500 = document.getElementById('debt-pay-500');
  const pay1000 = document.getElementById('debt-pay-1000');

  if (money >= 1000 && debt >= 1000) {
    pay50.classList.remove('disabled');
    pay100.classList.remove('disabled');
    pay500.classList.remove('disabled');
    pay1000.classList.remove('disabled');
  } else if (money >= 500 && debt >= 500) {
    pay50.classList.remove('disabled');
    pay100.classList.remove('disabled');
    pay500.classList.remove('disabled');
    pay1000.classList.add('disabled');
  } else if (money >= 100 && debt >= 100) {
    pay50.classList.remove('disabled');
    pay100.classList.remove('disabled');
    pay500.classList.add('disabled');
    pay1000.classList.add('disabled');
  } else if (money >= 50 && debt >= 50) {
    pay50.classList.remove('disabled');
    pay100.classList.add('disabled');
    pay500.classList.add('disabled');
    pay1000.classList.add('disabled');
  }
}

export function showHint(key, action) {
  const hintKey = document.querySelector('div#hint #key');
  const hintAction = document.querySelector('div#hint #action');

  hintKey.textContent = key;
  hintAction.textContent = action;

  document.getElementById('hint').style.visibility = 'visible';
}

export function hideHint() {
  document.getElementById('hint').style.visibility = 'hidden';
}

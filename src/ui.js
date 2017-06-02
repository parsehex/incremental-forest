export function updateInventory(name, value) {
  const elem = document.querySelector('div#carrying #' + name + '#value');

  elem.textContent = value;
}

export function showHint(objectName, key, action) {
  const hintObjectName = document.querySelector('div#hint #object-name');
  const hintKey = document.querySelector('div#hint #key');
  const hintAction = document.querySelector('div#hint #action');

  hintObjectName.textContent = objectName;
  hintKey.textContent = key;
  hintAction.textContent = action;

  document.getElementById('hint').style.visibility = 'visible';
}

export function hideHint() {
  document.getElementById('hint').style.visibility = 'hidden';
}

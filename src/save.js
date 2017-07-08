// version is only bumped when an error is encountered due to an old version; not necessarily on every format change
const version = 2;
const loadedVersion = localStorage.getItem('save-version') || 1;
if (version != loadedVersion) {
  localStorage.clear();
  localStorage.setItem('save-version', version);
}

let data = localStorage.getItem('game');
if (data) {
  data = JSON.parse(data);
} else {
  data = {};
}

export let autoSave = true;
if (typeof load('autosave') === 'boolean') autoSave = load('autosave');

export function autoSaveToggle() {
  autoSave = !autoSave;

  save('autosave', autoSave);
}

let changes = 0;
function changed() {
  changes++;

  if (autoSave && changes >= 50) {
    forceSave();
    changes = 0;

    console.log('game saved');
  }
}

export function forceSave() {
  localStorage.setItem('game', JSON.stringify(data));
}

export function save(name, value) {
  data[name] = value;

  changed();
}
export function load(name) {
  return data[name];
}
export function clear() {
  data = {};
  localStorage.removeItem('game');

  // disable autoSave until page is refreshed
  autoSave = false;
}

window.addEventListener('beforeunload', function() {
  if (!autoSave || changes === 0) return;

  forceSave();

  console.log('game saved');
});

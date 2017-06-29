let data = localStorage.getItem('game');
if (data) {
  data = JSON.parse(data);
} else {
  data = {};
}

let changes = 0;
function changed() {
  changes++;

  if (changes >= 15) {
    localStorage.setItem('game', JSON.stringify(data));
    changes = 0;

    console.log('game saved');
  }
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
}

window.addEventListener('beforeunload', function() {
  if (changes === 0) return;
  
  localStorage.setItem('game', JSON.stringify(data));

  console.log('game saved');
});

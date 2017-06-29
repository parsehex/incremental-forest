import move from './move';
import interact from './interact';

let moving = false, direction = null, dragTime = 0, down = false, c, ctx;
let startX = null, startY = null, startTime = null, elapsed = null;
let curX = null, curY = null, timer = null;
const threshold = 100, minTime = 600, touchDist = 50;

export default function setupTouch() {
  c = document.getElementsByTagName('canvas')[0];
  ctx = c.getContext('2d');

	c.addEventListener('touchstart', (event) => {
    startTime = Date.now();

    down = true;
    elapsed = 0;

    timer = setTimeout(interactLoop.bind(this), 500);

    startX = event.touches[0].pageX - c.offsetLeft;
    startY = event.touches[0].pageY - c.offsetTop;
  });
  c.addEventListener('touchmove', (event) => {
    event.preventDefault();
  	if (!down) return;

    curX = event.touches[0].pageX - c.offsetLeft;
    const xDist = Math.abs(startX - curX);

    curY = event.touches[0].pageY - c.offsetTop;
    const yDist = Math.abs(startY - curY);

    elapsed = Date.now() - startTime;

    if (elapsed > minTime) {
      down = false;
      return;
    }

    if (yDist >= threshold && xDist < threshold) {
      // swiping vertically
      if (curY < startY) moveLoop.call(this, 'UP');
      else if (curY > startY) moveLoop.call(this, 'DOWN');
    } else if (xDist >= threshold && yDist < threshold) {
      // swiping horizontally
      if (curX > startX) moveLoop.call(this, 'RIGHT');
      else if (curX < startX) moveLoop.call(this, 'LEFT');
    }
  });
  window.addEventListener('touchend', touchCancel.bind(this));
}
function interactLoop(time) {
  if (!down || curY >= touchDist || curX >= touchDist) return;

  this.controls.interact();

  timer = setTimeout(interactLoop.bind(this), time || 200);
}
function moveLoop(direction) {
  if (!down) return;

  this.controls.move(direction);

  setTimeout(moveLoop.bind(this, direction), 30);
}
function touchCancel(event) {
  if (elapsed === 0) this.controls.interact();
  clearTimeout(timer);

  down = false;

  curX = 0;
  curY = 0;
}

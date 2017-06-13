export default function collide(character) {
  if (this.placed) return;

  this.pickUp(character);
}

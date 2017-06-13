export default function interact(character) {
  if (!this.placed) return;

  this.pickUp(character);
}

import frames from '../../sprite-frames';

const { GENERATOR } = frames;

export default function update() {
  if (this.inventory.water > 0) {
    if (this.frame !== GENERATOR.ON) {
      this.frame = GENERATOR.ON;
    }
  } else {
    if (this.frame !== GENERATOR.OFF) {
      this.frame = GENERATOR.OFF;
    }
  }
}

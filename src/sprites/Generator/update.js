import frames from '../../sprite-frames';

const { GENERATOR } = frames;

export default function update() {
  if (this.powered && this.frame !== GENERATOR.ON) {
    this.frame = GENERATOR.ON;
  } else if (this.frame !== GENERATOR.OFF) {
    this.frame = GENERATOR.OFF;
  }
}

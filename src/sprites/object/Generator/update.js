import frames from '../../../sprite-frames';

const { MAIN } = frames;

export default function update() {
  if (this.powered && this.frame !== MAIN.GENERATOR_ON) {
    this.frame = MAIN.GENERATOR_ON;
  } else if (this.frame !== MAIN.GENERATOR_OFF) {
    this.frame = MAIN.GENERATOR_OFF;
  }
}

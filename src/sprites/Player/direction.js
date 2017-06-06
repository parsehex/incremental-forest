import frames from '../../sprite-frames';

export default function getDirection() {
  const frame = this.frame;
  const playerFrames = frames.GUY;

  for (let name in playerFrames) {
    if (playerFrames[name] === frame) return name.replace('STAND_', '');
  }
}

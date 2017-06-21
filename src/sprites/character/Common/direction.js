import frames from '../../../sprite-frames';

export function getDirectionFromFrame(frame) {
  const frame = frame || this.frame;
  const playerFrames = frames.CHARACTER;

  for (let name in playerFrames) {
    if (playerFrames[name] === frame) return name.replace('STAND_', '');
  }
}

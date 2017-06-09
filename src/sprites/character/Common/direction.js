import frames from '../../../sprite-frames';

export function getDirectionFromFrame(frame) {
  const frame = frame || this.frame;
  const playerFrames = frames.CHARACTER;

  for (let name in playerFrames) {
    if (playerFrames[name] === frame) return name.replace('STAND_', '');
  }
}

export function getDirectionFromCoord(coord) {
  const frame = coord;

  // do coordinate maths
}

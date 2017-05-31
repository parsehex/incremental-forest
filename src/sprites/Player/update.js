import frames from '../../sprite-frames';
import controllable from '../Common/update/controllable';

export default function update() {
  controllable.call(this, frames.GUY);
}

import { load } from '../../../../save';

import loadFromSave from './save-objects';
import loadFromMap from './map-objects';

export default function addObjects() {
  if (load('world.fastMap')) {
    loadFromSave.call(this);
  } else {
    loadFromMap.call(this);
  }
}

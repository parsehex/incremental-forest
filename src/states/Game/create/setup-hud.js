import { drawText } from '../../../ui';

export default function setupHUD() {
  this.hud.water = drawText.call(this,
    15,
    25,
    'Water: 0',
    { font: '15px Courier', fill: 'lightblue', align: 'center', stroke: 'black', strokeThickness: 6 }
  );
}

import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import GameState from './states/Game';

import config from './config';

class Game extends Phaser.Game {
  constructor () {
    const parentEl = document.getElementById('game-target');
    let width, height;
    if (parentEl.clientWidth > config.gameWidth) {
      // parent element has plenty of room for game
      width = config.gameWidth;
      height = config.gameHeight;
    } else {
      // can't fit game into parent element
      width = parentEl.clientWidth - 25;

      // make height half screen size to make room for other ui
      height = window.innerHeight / 2;
    }

    const gameConfig = {
      width,
      height,
      renderer: Phaser.AUTO,
      parent: 'game-target',
      state: null,
      antialias: false,
      enableDebug: false,
    };
    super(gameConfig);

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }
}

window.game = new Game();

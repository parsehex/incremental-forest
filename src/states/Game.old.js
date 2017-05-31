/* globals __DEV__ */
import Phaser from 'phaser';
// import Mushroom from '../sprites/Mushroom';

import { findObjByKey } from '../utils.js';

export default class extends Phaser.State {
  constructor() {
    super();

    // Define movement constants
    this.MAX_SPEED = 350; // pixels/second
    this.ACCELERATION = 1900; // pixels/second/second
    this.DRAG = 5000; // slow player down right away
    this.GRAVITY = 3000; // pixels/second/second
    this.JUMP_SPEED = -700; // pixels/second (negative y is up)
  }
  init() {}
  preload() {}

  create() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.map = this.game.add.tilemap('level1', 32, 32, 25, 15);

    let playerStart = findObjByKey(this.map.objects.objects, 'name', 'playerStart');
    let bossStart = findObjByKey(this.map.objects.objects, 'name', 'bossStart');

    this.map.addTilesetImage('Ground', 'groundTiles');

    this.background = this.map.createLayer('background');
    this.foreground = this.map.createLayer('foreground');

    this.map.setCollisionBetween(1, 2000, true, 'foreground');

    this.player = this.game.add.sprite(playerStart.x, playerStart.y, 'player');
    this.game.physics.p2.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
    // this.player.body.drag.setTo(this.DRAG, 0);

    this.boss = this.game.add.sprite(bossStart.x, bossStart.y, 'boss1');
    this.game.physics.p2.enable(this.boss);

    this.game.physics.p2.gravity.y = this.GRAVITY;

    // player animations
    // this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    // this.player.animations.play('right');

    this.background.resizeWorld();

    //Make the camera follow the sprite
    this.game.camera.follow(this.player);

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ]);
  }

  render() {}

  update() {
    // this.game.physics.p2.collide(this.player, this.foreground);
    // this.game.physics.p2.collide(this.boss, this.foreground);

    if (leftInputIsActive.call(this)) {
        this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (rightInputIsActive.call(this)) {
        this.player.body.acceleration.x = this.ACCELERATION;
    } else {
        this.player.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = this.player.body.touching.down || true;

    if (onTheGround && upInputIsActive.call(this)) {
        // Jump when the player is touching the ground and the up arrow is pressed
        this.player.body.velocity.y = this.JUMP_SPEED;
    }
  }
}

function leftInputIsActive() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x < this.game.width/4);

    return isActive;
}

function rightInputIsActive() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown &&
        this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

    return isActive;
}

function upInputIsActive(duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
        this.game.input.activePointer.x > this.game.width/4 &&
        this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

    return isActive;
}

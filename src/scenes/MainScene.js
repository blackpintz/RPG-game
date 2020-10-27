import playerImg from '../../assets/character/female.png';
import playerJSON from '../../assets/character/female_atlas.json';

export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.atlas('character', playerImg, playerJSON);
  }

  create() {
    this.player = new Phaser.Physics.Matter.Sprite(this.matter.world, 0, 0, 'character', 'townsfolk_f_idle_1');
    this.add.existing(this.player);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  update() {
    console.log('We are updating!');
    const speed = 2.5;
    const playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }


    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
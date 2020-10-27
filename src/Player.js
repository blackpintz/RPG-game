import playerImg from '../assets/character/female.png';
import playerJSON from '../assets/character/female_atlas.json';
import jsonData from '../assets/character/female_anim.json';

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    const {
      scene, x, y, texture, frame,
    } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.atlas('female', playerImg, playerJSON);
    scene.load.animation('female_anims', jsonData);
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {
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
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play('walk', true);
    } else {
      this.anims.play('idle', true);
    }
  }
}
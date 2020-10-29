import DropItem from './DropItem';

export default class MatterEntity extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    const {
      name, scene, x, y, health, drops, texture, frame, depth,
    } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.depth = depth || 1;
    this.name = name;
    this.health = health;
    this.drops = drops;
    this._position = new Phaser.Math.Vector2(this.x, this.y);
    this.sound = this.scene.sound.add('soundmusic');
    this.scene.add.existing(this);
  }

  get position() {
    this._position.set(this.x, this.y);
    return this._position;
  }

  get velocity() {
    return this.body.velocity;
  }

  get dead() {
    return this.health <= 0;
  }

    onDeath = () => {};

    hit = () => {
      if (this.sound) this.sound.play();
      this.health--;
      if (this.dead) {
        this.drops.forEach(drop => new DropItem({
          scene: this.scene, x: this.x, y: this.y, frame: drop,
        }));
      }
    }
}
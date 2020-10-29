import resourceImg from '../assets/character/resources.png';
import resourceJSON from '../assets/character/resources_atlas.json';
import sound from '../assets/audio/chop.wav'

export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas('resources', resourceImg, resourceJSON);
    scene.load.audio('soundmusic', sound)
  }

  constructor(data) {
    const { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    this.name = resource.type;
    this.health = 5;
    this.sound = this.scene.sound.add('soundmusic');
    this.setStatic(true);
    this.scene.add.existing(this);
  }

  get dead() {
    return this.health <= 0;
  }

  hit = () => {
    if (this.sound) this.sound.play();
    this.health--;
  }
}
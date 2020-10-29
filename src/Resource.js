import resourceImg from '../assets/character/resources.png';
import resourceJSON from '../assets/character/resources_atlas.json';
import sound from '../assets/audio/chop.wav';
import pickSound from '../assets/audio/pick.wav';
import DropItem from './DropItem';

export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas('resources', resourceImg, resourceJSON);
    scene.load.audio('soundmusic', sound);
    scene.load.audio('pickup', pickSound);
  }

  constructor(data) {
    const { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    this.drops = JSON.parse(resource.properties.find(p => p.name == 'drops').value);
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
    if (this.dead) {
      this.drops.forEach(drop => new DropItem({
        scene: this.scene, x: this.x, y: this.y, frame: drop,
      }));
    }
  }
}

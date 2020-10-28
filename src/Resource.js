import resourceImg from '../assets/character/resources.png';
import resourceJSON from '../assets/character/resources_atlas.json';

export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas('resources', resourceImg, resourceJSON);
  }

  constructor(data) {
    const { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    this.setStatic(true);
    this.scene.add.existing(this);
  }
}
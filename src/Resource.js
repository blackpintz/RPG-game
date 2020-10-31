import resourceImg from '../assets/character/resources.png';
import resourceJSON from '../assets/character/resources_atlas.json';
import tree from '../assets/audio/tree.mp3';
import rock from '../assets/audio/rock.mp3';
import bush from '../assets/audio/bush.mp3';
import pickup from '../assets/audio/pickup.mp3';
import MatterEntity from './MatterEntity';

export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('resources', resourceImg, resourceJSON);
    scene.load.audio('tree', tree);
    scene.load.audio('rock', rock);
    scene.load.audio('bush', bush);
    scene.load.audio('pickup', pickup);
  }

  constructor(data) {
    const { scene, resource } = data;
    const drops = JSON.parse(resource.properties.find(p => p.name == 'drops').value);
    const depth = JSON.parse(resource.properties.find(p => p.name == 'depth').value);
    const score = resource.properties.find(p => p.name == 'score').value;
    super({
      scene, x: resource.x, y: resource.y, texture: 'resources', frame: resource.type, drops, depth, score, health: 5, name: resource.type,
    });
    const yOrigin = resource.properties.find(p => p.name == 'yOrigin').value;
    this.y += this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    const circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'collider' });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}

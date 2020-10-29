import resourceImg from '../assets/character/resources.png';
import resourceJSON from '../assets/character/resources_atlas.json';
import sound from '../assets/audio/chop.wav';
import pickSound from '../assets/audio/pick.wav';
import MatterEntity from './MatterEntity';

export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('resources', resourceImg, resourceJSON);
    scene.load.audio('soundmusic', sound);
    scene.load.audio('pickup', pickSound);
  }

  constructor(data) {
    const { scene, resource } = data;
    const drops = JSON.parse(resource.properties.find(p => p.name == 'drops').value);
    const depth = JSON.parse(resource.properties.find(p => p.name == 'depth').value);
    super({
      scene, x: resource.x, y: resource.y, texture: 'resources', frame: resource.type, drops, depth, health: 5, name: resource.type,
    });
    this.setStatic(true);
  }
}

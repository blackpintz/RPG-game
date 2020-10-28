import Player from '../Player';
import gameMap from '../../assets/character/map.json';
import rpgImage from '../../assets/character/RPG Nature Tileset.png';
import resourceImg from '../../assets/character/resources.png';
import resourceJSON from '../../assets/character/resources_atlas.json';

export default class MainScene extends Phaser.Scene {
  preload() {
    Player.preload(this);
    this.load.image('tiles', rpgImage);
    this.load.tilemapTiledJSON('map', gameMap);
    this.load.atlas('resources', resourceImg, resourceJSON);
  }

  addResources() {
    const resources = this.map.getObjectLayer('Resources');
    resources.objects.forEach(resource => {
      const resourceItem = new Phaser.Physics.Matter.Sprite(this.matter.world, resource.x, resource.y, 'resources', resource.type);
      resourceItem.setStatic(true);
      this.add.existing(resourceItem);
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    this.map = map;
    const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);
    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);

    this.addResources();

    this.player = new Player({
      scene: this, x: 50, y: 50, texture: 'female', frame: 'townsfolk_f_idle_1',
    });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  update() {
    this.player.update();
  }
}
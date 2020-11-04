import Player from '../Player';
import Enemy from '../Enemy';
import gameMap from '../../assets/character/map.json';
import rpgImage from '../../assets/character/RPG Nature Tileset.png';
import Resource from '../Resource';
import { sendData } from '../ScoreApi';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.enemies = [];
  }

  init(data) {
    this.playerName = data.player;
  }

  preload() {
    Player.preload(this);
    Enemy.preload(this);
    Resource.preload(this);
    this.load.image('tiles', rpgImage);
    this.load.tilemapTiledJSON('map', gameMap);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    this.map = map;
    const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);
    const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.map.getObjectLayer('Resources').objects.forEach(resource => new Resource({ scene: this, resource }));
    this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({ scene: this, enemy })));

    this.player = new Player({
      scene: this, x: 100, y: 100, texture: 'female', frame: 'townsfolk_f_idle_1',
    });

    this.scoreText = this.add.text(250, 10, '', { fontSize: '22px', fill: '#000' });

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });
  }

  gameOver() {
    if (this.player.dead || this.enemies.every(enemy => enemy.dead)) {
      const postScore = this.player.totalScore || '0';
      sendData(this.playerName, postScore);
      this.scene.start('LeaderboardScene', { score: this.player.totalScore ? this.player.totalScore : 0, player: this.playerName });
    }
  }

  update() {
    this.enemies.forEach(enemy => enemy.update());
    this.player.update();
    this.scoreText.setText(`Score: ${this.player.totalScore ? this.player.totalScore : 0}`);
    this.gameOver();
  }
}
import './style.css';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import MainScene from './scenes/MainScene';

const gameConfig = {
  width: 640,
  height: 320,
  backgroundColor: '#999999',
  type: Phaser.AUTO,
  parent: 'content',
  scene: [MainScene],
  scale: {
    zoom: 2,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
};

new Phaser.Game(gameConfig);
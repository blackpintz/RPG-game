import './style.css';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import MainScene from './scenes/MainScene';
import IntroScene from './scenes/IntroScene';
import LeaderboardScene from './scenes/LeaderboardScene';

const gameConfig = {
  width: 640,
  height: 320,
  backgroundColor: '#999999',
  type: Phaser.AUTO,
  parent: 'content',
  dom: {
    createContainer: true,
  },
  scene: [IntroScene, MainScene, LeaderboardScene],
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
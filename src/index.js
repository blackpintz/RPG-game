import './style.css';
import 'phaser';

import { SimpleScene } from './scenes/test';

const gameConfig = {
  width: 1300,
  height: 600,
  scene: SimpleScene,
};

new Phaser.Game(gameConfig);
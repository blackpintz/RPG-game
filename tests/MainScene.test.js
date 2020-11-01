import 'phaser';
import MainScene from '../src/scenes/MainScene';


test('MainScene should be an instance of Phaser.Scene', () => {
  expect(MainScene.prototype).toBeInstanceOf(Phaser.Scene);
});
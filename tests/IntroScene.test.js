import 'phaser';
import IntroScene from '../src/scenes/IntroScene';

test('IntroScene should be an instance of Phaser.Scene', () => {
  expect(IntroScene.prototype).toBeInstanceOf(Phaser.Scene);
});
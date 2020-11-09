import 'phaser';
import LeaderboardScene from '../src/scenes/LeaderboardScene';

test('LeaderboardScene should be an instance of Phaser.Scene', () => {
  expect(LeaderboardScene.prototype).toBeInstanceOf(Phaser.Scene);
});
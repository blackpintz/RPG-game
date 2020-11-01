import 'phaser';
import MatterEntity from '../src/MatterEntity';

test('MatterEntity should be an instance of Phaser.Physics.Matter.Sprite', () => {
  expect(MatterEntity.prototype).toBeInstanceOf(Phaser.Physics.Matter.Sprite);
});
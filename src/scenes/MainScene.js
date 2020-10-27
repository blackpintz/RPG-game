import Player from '../Player';

export default class MainScene extends Phaser.Scene {
  preload() {
    Player.preload(this);
  }

  create() {
    this.player = new Player({
      scene: this, x: 0, y: 0, texture: 'female', frame: 'townsfolk_f_idle_1',
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

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
  }

  create() {
    this.add.text(100, 100, 'Game over');
    this.add.text(200, 200, `Your score: ${this.finalScore}`);
  }
}

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
  }

  preload() {
  }

  create() {
    this.add.text(200, 40, 'How to play', { fontSize: 30 });

    this.add.text(100, 70, '- Use the arrow keys to move the player', { fontSize: 20, color: '#000' });
    this.add.text(100, 85, '  up, down, left and right.', { fontSize: 20, color: '#000' });

    this.add.text(100, 110, '- Press on the touch-pad or left-click', { fontSize: 20, color: '#000' });
    this.add.text(100, 125, '  on the touchpad to axe the enemy.', { fontSize: 20, color: '#000' });

    this.intro = this.add.text(200, 155, 'Enter your name: ', { fontSize: 20, fontFamily: 'monospace' });
    this.add.text(200, 175, '(You cannot play without a name.)', { fontSize: 10, color: '#000' });
    const input = this.add.dom(300, 200, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
      required: true,
    });
    input.scaleX = 0.5;
    input.scaleY = 0.6;

    const playButton = this.add.dom(300, 250, 'button', {
      type: 'submit',
    }, 'Start Game');
    playButton.addListener('click');
    playButton.on('click', () => {
      if (input.node.value) {
        this.scene.start('MainScene', { player: input.node.value });
      }
    });
  }
}
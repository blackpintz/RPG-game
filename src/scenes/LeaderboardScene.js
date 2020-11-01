import { retrieveData } from '../ScoreApi';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('LeaderboardScene');
  }

  init(data) {
    this.finalScore = data.score;
    this.thePlayer = data.player;
  }

  preload() {
  }

  create() {
    this.add.text(40, 20, `Game over, ${this.thePlayer}. Your score: ${this.finalScore}. Refresh page to play again.`);
    this.add.text(100, 60, 'Top scores', { color: '#fff', fontSize: '20px' });
    retrieveData().then((data) => {
      const dataStyle = {
        color: '#000',
        fontSize: '18px ',
      };

      data.sort((x, y) => y.score - x.score);
      const space = 20;
      for (let i = 0; i < 10; i += 1) {
        if (data[i] !== undefined) {
          this.add.text(60, 80 + (space * i),
            `${i + 1}. Name: ${data[i].user} -- Score: ${data[i].score}`,
            dataStyle);
        }
      }
    });
  }
}
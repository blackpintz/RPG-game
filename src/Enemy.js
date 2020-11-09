import MatterEntity from './MatterEntity';
import enemyImg from '../assets/character/enemies.png';
import enemyJSON from '../assets/character/enemies_atlas.json';
import enemyAnimation from '../assets/character/enemies_anim.json';
import bear from '../assets/audio/bear.mp3';
import wolf from '../assets/audio/wolf.mp3';
import ent from '../assets/audio/ent.mp3';

export default class Enemy extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('enemies', enemyImg, enemyJSON);
    scene.load.animation('enemies_anims', enemyAnimation);
    scene.load.audio('bear', bear);
    scene.load.audio('wolf', wolf);
    scene.load.audio('ent', ent);
  }

  constructor(data) {
    const { scene, enemy } = data;
    const drops = JSON.parse(enemy.properties.find(p => p.name == 'drops').value);
    const health = enemy.properties.find(p => p.name == 'health').value;
    const score = enemy.properties.find(p => p.name == 'score').value;
    super({
      scene, x: enemy.x, y: enemy.y, texture: 'enemies', frame: `${enemy.name}_idle_1`, drops, health, score, name: enemy.name,
    });

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const enemyCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'enemyCollider', color: '#fff' });
    const enemySensor = Bodies.circle(this.x, this.y, 80, { isSensor: true, label: 'enemySensor' });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: other => { if (other.gameObjectB && other.gameObjectB.name === 'player') this.attacking = other.gameObjectB; },
    });
  }

    attack = (target) => {
      if (target.dead || this.dead) {
        clearInterval(this.attackTimer);
        return;
      }
      target.hit();
    }

    update() {
      if (this.dead) return;
      if (this.attacking) {
        const direction = this.attacking.position.subtract(this.position);
        if (direction.length() > 24) {
          const v = direction.normalize();
          this.setVelocityX(direction.x);
          this.setVelocityY(direction.y);
          if (this.attackTimer) {
            clearInterval(this.attackTimer);
            this.attackTimer = null;
          }
        } else if (this.attackTimer == null) {
          this.attackTimer = setInterval(this.attack, 500, this.attacking);
        }
      }
      this.setFlipX(this.velocity.x < 0);
      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        this.anims.play(`${this.name}_walk`, true);
      } else {
        this.anims.play(`${this.name}_idle`, true);
      }
    }
}
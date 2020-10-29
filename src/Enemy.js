import MatterEntity from './MatterEntity'
import enemyImg from '../assets/character/enemies.png';
import enemyJSON from '../assets/character/enemies_atlas.json';
import enemyAnimation from '../assets/character/enemies_anim.json';

export default class Enemy extends MatterEntity {
    static preload(scene) {
        scene.load.atlas('enemies', enemyImg, enemyJSON);
        scene.load.animation('enemies_anims', enemyAnimation);
    }

    constructor(data) {
        let {scene, enemy} = data;
        const drops = JSON.parse(enemy.properties.find(p => p.name == 'drops').value);
        const health = enemy.properties.find(p => p.name == 'health').value
        super({
            scene, x: enemy.x, y: enemy.y, texture: 'enemies', frame: `${enemy.type}_idle_1`, drops, health, name: enemy.type,
          });
        this.setStatic(true);
    }

    update() {
        console.log('enemy update');
    }
}
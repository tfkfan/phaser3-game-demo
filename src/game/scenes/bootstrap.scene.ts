import store from '../../store';
import { setLoading } from '../../store/application.store';
import { useGlobalState } from '../../hooks';

export default class BootstrapScene extends Phaser.Scene {
  constructor() {
    super('bootstrap');
  }

  init() {
    store.dispatch(setLoading(true));
  }

  preload() {
    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
      useGlobalState(state => state.setProgress(100 * value));
    });
    this.load.tilemapTiledJSON('worldmap', './assets/maps/new/map01merged.json');
    this.load.image('tiles', './assets/maps/new/tiles.png');
    this.load.atlas('mage', './assets/playersheets/mage.png', './assets/playersheets/mage.json');
    this.load.image('fireball', './assets/skillsheets/fire_002.png');
    this.load.spritesheet('buff', './assets/skillsheets/cast_001.png', { frameWidth: 192, frameHeight: 192 });
    this.load.image('face', './assets/images/face.png');
    this.load.spritesheet('fireballBlast', './assets/skillsheets/s001.png', { frameWidth: 192, frameHeight: 192 });
    this.load.audio('intro', ['./assets/music/phaser-quest-intro.ogg']);
    this.load.glsl('fireball_shader', './assets/shaders/fireball_shader.frag');
  }

  create() {
    useGlobalState(state => state.setProgress(100));
    store.dispatch(setLoading(false));

    this.sound.add('intro').play({
      seek: 2.55,
    });

    this.add.shader('fireball_shader', window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);
  }
}

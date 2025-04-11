import Mage from '../actors/players/mage';
import { GameConfig } from '../../config/config';
import { Direction } from '../../shared/Direction';
import store from '../../store';
import Face from '../actors/items/face';
import Vector2 = Phaser.Math.Vector2;
import { useGlobalState } from '../../hooks';

export default class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private player: Mage;
  private skillIndexMap = { '1': 0, '2': 1 };
  private keymap: any = {
    'd': Direction.RIGHT,
    's': Direction.DOWN,
    'a': Direction.LEFT,
    'w': Direction.UP,
    'в': Direction.RIGHT,
    'ы': Direction.DOWN,
    'ф': Direction.LEFT,
    'ц': Direction.UP
  };

  constructor() {
    super('game');
  }

  create() {
    useGlobalState(state => state.setVersion(`Phaser v${Phaser.VERSION}`))

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (evt: { key: string; }) => {
      this.player.setSkillIndex(this.skillIndexMap[evt.key]);
      const direction = this.keymap[evt.key];
      if (direction)
        this.player.walk(direction, true);
    });
    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, (evt: { key: string; }) => {
      const direction = this.keymap[evt.key];
      if (direction)
        this.player.walk(direction, false);
    });

    this.input.on(Phaser.Input.Events.POINTER_DOWN, (evt: {
      worldX: number;
      worldY: number;
    }) => this.player.attack(new Vector2(evt.worldX, evt.worldY)));

    this.createAnimations();
    this.displayMap();
    this.createPlayer();
    this.cameras.main.startFollow(this.player);

    // examples

    // Animation/Sprite
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('fireballBlast', { start: 0, end: 19, first: 0 }),
      frameRate: 20,
      repeat: -1
    });

    this.add.sprite(2500, 1100, '').play('explosion');

    // Arcade Physics / collision

    const items = this.add.group([this.createItem()]);
    this.physics.add.collider(this.player, items, (object1, object2) => {
      object2.destroy(true);
      setTimeout(() => {
        items.add(this.createItem(), true);
      }, 3000);
    });

  }

  createItem(): Face {
    return new Face(this, 2500, 1100);
  }

  createPlayer(): Mage {
    return this.player = new Mage(this, 2100, 1000, store.getState().application.nickname);
  }

  createAnimations() {
    GameConfig.playerAnims.map((key) => ({
      key,
      frames: this.anims.generateFrameNames('mage', {
        prefix: key,
        start: 0,
        end: 4
      }),
      frameRate: 8,
      repeat: !key.includes('attack') && !key.includes('death') ? -1 : 0
    })).concat([
      {
        key: 'fireballBlast',
        frames: this.anims.generateFrameNumbers('fireballBlast', { start: 0, end: 19, first: 0 }),
        frameRate: 20,
        repeat: 0
      },
      {
        key: 'buff',
        frames: this.anims.generateFrameNumbers('buff', { start: 0, end: 19, first: 0 }),
        frameRate: 20,
        repeat: 0
      }
    ]).forEach((config) => this.anims.create(config));
  }

  displayMap() {
    this.map = this.add.tilemap('worldmap');
    const tileset = this.map.addTilesetImage('tiles', 'tiles');
    for (let i = 0; i < this.map.layers.length; i++)
      this.map.createLayer(0, tileset, 0, 0).setVisible(true);
  }

  update(time, delta) {
    useGlobalState(state => state.setFps(Math.trunc(this.sys.game.loop.actualFps)));
  }
}

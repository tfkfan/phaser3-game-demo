import Phaser from 'phaser'
import BootstrapScene from "./scenes/bootstrap.scene";
import GameScene from "./scenes/game.scene";

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  parent: 'game-root',
  canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
  width: window.innerWidth ,
  height: window.innerHeight - 10,
  pixelArt: true,
  scene: [BootstrapScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}


const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame





export default phaserGame

import Phaser from 'phaser'
import BootstrapScene from "./game/scenes/bootstrap.scene";
import GameScene from "./game/scenes/game.scene";

const config = {
  type: Phaser.WEBGL,
  parent: 'game-root',
  canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
  width: window.innerWidth ,
  height: window.innerHeight,
  pixelArt: true,
  scene: [BootstrapScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}


const phaserGame = new Phaser.Game(config)

;(window as any).game = phaserGame

export const launchGame =  () => {
  document.getElementById("root").style.pointerEvents="none"
  phaserGame.scene.start('game')
}


export default phaserGame

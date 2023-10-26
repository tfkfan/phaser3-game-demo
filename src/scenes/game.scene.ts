import {network, MessageType} from "../net/network";
import {CONTROLS} from "../controls";
import PhaserLogo from "../actors/phaserLogo";
import Vector2 = Phaser.Math.Vector2;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game')
        // Use this update handler to update game state coming from websocket
        network.on(MessageType.UPDATE, (data) => {

        }, this)
    }

    create() {
        CONTROLS.setVersion(`Phaser v${Phaser.VERSION}`)

        this.input.on('pointermove', (evt) => {
            const evtPoint = new Vector2(evt.worldX, evt.worldY);
            network.send(MessageType.PLAYER_MOUSE_MOVE, {evtPoint})
        });

        new PhaserLogo(this, this.cameras.main.width / 2, 0)

        // display the Phaser.VERSION
        this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: '#000000',
                fontSize: '24px'
            })
            .setOrigin(1, 0)
    }

    update() {
        CONTROLS.setFps(Math.trunc(this.sys.game.loop.actualFps));
    }
}

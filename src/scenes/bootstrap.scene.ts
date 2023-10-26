export default class BootstrapScene extends Phaser.Scene {
    constructor() {
        super('bootstrap')
    }

    preload() {
        this.load.image('phaser-logo', 'assets/phaser-logo.png')
    }

    create() {
        this.scene.start('game')
    }

}

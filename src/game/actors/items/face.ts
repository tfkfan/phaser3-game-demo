import Phaser, {Scene} from "phaser";

export default class Face extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'face');
    }
}
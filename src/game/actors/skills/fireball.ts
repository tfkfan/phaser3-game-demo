import {Skill} from "./skill";
import Vector2 = Phaser.Math.Vector2;

export class Fireball extends Skill {
    constructor(scene: Phaser.Scene, x: number, y: number, target: Vector2) {
        super(scene, x, y, "fireball", target);
    }

    override init() {
        super.init();
        this.setScale(0.02, 0.02);
    }

    override playFinalAnimation() {
        this.play("fireballBlast");
        this.setScale(1, 1)
    }
}
import {Skill} from "./skill";
import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;

export class Buff extends Skill {
    constructor(scene: Phaser.Scene, x: number, y: number, target: Vector2) {
        super(scene, x, y, "buff", target);
    }

    override playFinalAnimation() {
        this.play("buff");
    }

    override init(): void {
        this.setPosition(this.initialPosition.x, this.initialPosition.y)
    }
}
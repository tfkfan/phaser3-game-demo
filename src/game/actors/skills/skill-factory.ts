import {Fireball} from "./fireball";
import {Skill} from "./skill";
import {Buff} from "./buff";
import Vector2 = Phaser.Math.Vector2;

export class SkillFactory {

    create(scene: Phaser.Scene, x: number, y: number, target: Vector2, key: string): Skill {
        switch (key) {
            case "Fireball":
                return new Fireball(scene, x, y, target);
            case "Buff":
                return new Buff(scene, x, y, new Vector2(x, y))
            default:
                return null;
        }
    }
}
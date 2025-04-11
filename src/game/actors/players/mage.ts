import * as Phaser from "phaser"
import Player from "./player";
import {SkillFactory} from "../skills/skill-factory";
import Scene = Phaser.Scene;
import Vector2 = Phaser.Math.Vector2;
import { useGlobalState } from '../../../hooks';

export default class Mage extends Player {
    private skillFactory: SkillFactory = new SkillFactory();
    private skills = ["Fireball", "Buff"]
    private currentSkillIndex = 0

    constructor(scene: Scene, x: number, y: number, name:string) {
        super(scene, x, y, "mage", name);
    }

    public setSkillIndex(index: number) {
        if (index === undefined || index < 0 || index > 1)
            return
        useGlobalState(state=>state.setSkill(index))
        this.currentSkillIndex = index
    }

    override attack(target: Vector2) {
        this.skillFactory.create(this.scene, this.x, this.y, target, this.skills[this.currentSkillIndex])
        super.attack(target)
    }
}

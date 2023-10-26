import * as Phaser from "phaser"
import Player from "../players/player";
import Vector2 = Phaser.Math.Vector2;
import {GameConfig} from "../../../config/config";
import destroy = Phaser.Loader.FileTypesManager.destroy;

export abstract class Skill extends Phaser.Physics.Arcade.Sprite {
    protected target: Vector2;
    protected initialPosition: Vector2;

    private finallyAnimated = false;

    protected constructor(scene: Phaser.Scene, x: number, y: number, image: string, target: Vector2) {
        super(scene, x, y, image, 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.target = target;
        this.initialPosition = new Vector2(x, y)
        this.init()
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if (!this.finallyAnimated && new Vector2(this.x, this.y).distance(this.target) < GameConfig.skillCollisionDistance) {
            this.finallyAnimated = true
            this.setVelocity(0, 0)
            this.animateFinally().then(sprite => this.destroy(true))
                .catch(e => this.destroy(true))
        }
    }

    protected abstract playFinalAnimation(): void

    animateFinally(): Promise<Skill> {
        return new Promise((resolve, reject) => {
            try {
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation: Phaser.Animations.Animation) => {
                    try {
                        resolve(this)
                    } catch (e) {
                        reject(e)
                    }
                }, this);
                this.playFinalAnimation()
            } catch (e) {
                reject(e)
            }
        })
    }

    init(): void {
        const vel = new Vector2(this.target.x - this.initialPosition.x, this.target.y - this.initialPosition.y).normalize()
        this.setPosition(this.initialPosition.x, this.initialPosition.y)
        this.setVelocity(vel.x * GameConfig.skillAbsVelocity, vel.y * GameConfig.skillAbsVelocity)
    }
}
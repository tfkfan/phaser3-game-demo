import * as Phaser from "phaser"
import {Direction} from "../../../shared/Direction";
import {GameConfig} from "../../../config/config";
import Scene = Phaser.Scene;
import Vector2 = Phaser.Math.Vector2;

export default abstract class Player extends Phaser.Physics.Arcade.Sprite {
    private animationKey: string;
    private attackAnimationKey: string;
    public isMoving: boolean;
    public isAttack: boolean;
    public name: string;
    public target: Vector2;
    private nameHolder: Phaser.GameObjects.Text;
    private directionState: Map<Direction, boolean> = new Map([
        [Direction.RIGHT, false],
        [Direction.UP, false],
        [Direction.DOWN, false],
        [Direction.LEFT, false]
    ]);
    private directionVerticalVelocity: Map<Direction, number> = new Map([
        [Direction.UP, -GameConfig.playerAbsVelocity],
        [Direction.DOWN, GameConfig.playerAbsVelocity]
    ])
    private directionHorizontalVelocity: Map<Direction, number> = new Map([
        [Direction.RIGHT, GameConfig.playerAbsVelocity],
        [Direction.LEFT, -GameConfig.playerAbsVelocity]
    ])

    protected constructor(scene: Scene, x: number, y: number, textureKey: string, name: string) {
        super(scene, x, y, textureKey);
        this.name = name;
        this.init();
    }

    private init() {
        this.isMoving = false;
        this.isAttack = false;
        this.animationKey = Direction.UP;
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this);

        this.nameHolder = this.scene.add.text(0, 0, this.name, {
            font: '14px pixel',
            stroke: "#ffffff",
            strokeThickness: 2
        }).setOrigin(0.5);
    }

    attack(target: Vector2) {
        this.isAttack = true
        this.target = target
        this.attackAnimationKey = `${this.animationKey}attack`

        this.play(this.attackAnimationKey);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isAttack = false;
            this.handleMovingAnimation()
        }, this);
    }

    walk(direction: Direction, state: boolean) {
        if (this.directionState.get(direction) === state)
            return;

        this.directionState.set(direction, state)
        const vec = [0, 0]
        const activeState = Array.from(this.directionState.entries())
            .filter(value => value[1])
            .map(value => {
                if (this.directionVerticalVelocity.has(value[0])) {
                    vec[1] = this.directionVerticalVelocity.get(value[0])
                } else if (this.directionHorizontalVelocity.has(value[0]))
                    vec[0] = this.directionHorizontalVelocity.get(value[0])
                return value[0]
            })
        this.isMoving = activeState.length > 0

        if (activeState.length === 1)
            this.animationKey = activeState[0]
        else if (activeState.length === 2)
            this.animationKey = activeState[1] + activeState[0]

        this.setVelocity(vec[0], vec[1])

        this.handleMovingAnimation()
    }

    private handleMovingAnimation() {
        if (this.isAttack)
            return;
        if (this.isMoving)
            this.play(this.animationKey);
        else {
            this.play(this.animationKey);
            this.stop()
        }
    }

    override preUpdate(time, delta): void {
        super.preUpdate(time, delta);
        this.nameHolder.setPosition(this.x, this.y - 30);
    }
}

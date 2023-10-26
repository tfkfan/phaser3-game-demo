import {checkExists} from "./utils";

export type ValueSetter<T> = (T) => void;

// Create your own react controls interface
interface GameDebugControls {
    setVersion: ValueSetter<string>
    setFps: ValueSetter<number>
    setSkill: ValueSetter<number>
}

interface GameLoaderControls {
    setProgress: ValueSetter<number>
}

// Add your own react controls
interface GameControlsMap {
    debug?: GameDebugControls
    loader?: GameLoaderControls
}

class GameControls {
    private controls: GameControlsMap = {}

    // Create your own register controls method
    public registerGameDebugControls(controls: GameDebugControls) {
        this.controls.debug = controls
    }

    public registerGameLoaderControls(controls: GameLoaderControls) {
        this.controls.loader = controls
    }

    // Create your own valueSetter method
    public setFps(fps: number) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setFps(fps)
    }

    public setSkill(skill: number) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setSkill(skill)
    }

    public setVersion(version: string) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setVersion(version)
    }

    public setProgress(progress: number) {
        if (checkExists(this.controls.loader))
            this.controls.loader.setProgress(progress)
    }
}

export const CONTROLS: GameControls = new GameControls()

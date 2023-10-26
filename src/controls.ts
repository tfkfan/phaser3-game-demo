import {checkExists} from "./utils";

export type ValueSetter<T> = (T) => void;

// Create your own react controls interface
interface GameDebugControls {
    setVersion: ValueSetter<string>
    setFps: ValueSetter<number>
}

// Add your own react controls
interface GameControlsMap {
    debug?: GameDebugControls
}

class GameControls {
    private controls: GameControlsMap = {}

    // Create your own register controls method
    public registerGameDebugControls(controls: GameDebugControls) {
        this.controls.debug = controls
    }

    // Create your own valueSetter method
    public setFps(fps: number) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setFps(fps)
    }

    public setVersion(version: string) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setVersion(version)
    }
}

export const CONTROLS: GameControls = new GameControls()

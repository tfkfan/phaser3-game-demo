import React, {useState} from 'react';
import 'phaser'
import 'bootstrap/dist/css/bootstrap.min.css';
import {CONTROLS} from "../../controls";

 const DebugPanel = () => {
    const [fps, setFps] = useState(0);
    const [version, setVersion] = useState('');
    CONTROLS.registerGameDebugControls({
        setVersion,
        setFps
    })

    return (
        <>
            <div style={{
                pointerEvents: 'none',
                userSelect: 'none'
            }}>
                <span >
                    Fps: {fps}
                </span>
                <br></br>
                <span >
                    Version: {version}
                </span>
            </div>
        </>
    );
};

export default DebugPanel;

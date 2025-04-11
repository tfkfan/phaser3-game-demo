import React, {useState} from 'react';
import 'phaser'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalReg } from '../../hooks';

 const DebugPanel = () => {
    const [fps, setFps] = useState(0);
    const [version, setVersion] = useState('');
    const [skill, setSkill] = useState(0);

    useGlobalReg({
      setVersion,
      setFps,
      setSkill
    });

    return (
        <>
            <div>
                <span >
                    Fps: {fps}
                </span>
                <br></br>
                <span >
                    Version: {version}
                </span>
                <br></br>
                <span >
                    Current skill: {skill+1}
                </span>
            </div>
        </>
    );
};

export default DebugPanel;

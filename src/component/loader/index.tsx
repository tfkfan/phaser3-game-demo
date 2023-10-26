import React, {useState} from 'react';
import {Progress} from 'reactstrap';
import {CONTROLS} from "../../controls";

export const Loader = ({isLoading = false}) => {
    const [progress, setProgress] = useState(0)

    CONTROLS.registerGameLoaderControls({
        setProgress
    })

    return (
        isLoading ? <Progress animated value={progress} style={{width:"100%"}}/> : <></>
    );
};

export default Loader;

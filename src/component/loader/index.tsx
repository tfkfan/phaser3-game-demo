import React, {useState} from 'react';
import {Progress} from 'reactstrap';
import { useGlobalReg } from '../../hooks';

export const Loader = ({isLoading = false}) => {
    const [progress, setProgress] = useState(0)

    useGlobalReg({
        setProgress
    })

    return (
        isLoading ? <Progress animated value={progress} style={{width:"100%"}}/> : <></>
    );
};

export default Loader;

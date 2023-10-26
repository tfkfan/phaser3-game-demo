import './app.scss';
import React from 'react';
import {useAppSelector} from "./hooks";
import Routes from "./routes";
import game from "./phaser-game"
import Loader from "./component/loader";

window.addEventListener('load', () => {
      game.scene.start("bootstrap")

})

export const App = () => {
    const page = useAppSelector((state) => state.application.currentPage)
    const loading = useAppSelector((state) => state.application.isLoading)
    return (
        <div className="inherit-size">
            {!loading && Routes.get(page)}
            <div className="bottom-center pointers-none">
                <Loader isLoading={loading}/>
            </div>
        </div>
    );
};
export default App;

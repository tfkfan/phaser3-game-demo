import './app.scss';
import React from 'react';
import {useAppSelector} from "./hooks";
import Routes from "./routes";
import game from "./phaser-game"

window.addEventListener('load', () => {
      game.scene.start("bootstrap")

})

export const App = () => {
    const page = useAppSelector((state) => state.application.currentPage)
    return (
        <div className="inherit-size">
            {Routes.get(page)}
        </div>
    );
};
export default App;

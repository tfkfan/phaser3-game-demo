import React from "react";
import Game from "./component/game";
import {Page} from "./config/constants";

const Routes: Map<Page, JSX.Element> = new Map<Page, JSX.Element>();
Routes.set(Page.GAME, <Game/>)

export default Routes

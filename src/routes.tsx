import React from "react";
import Game from "./component/game";
import {Page} from "./config/constants";
import Login from "./component/login";

const Routes: Map<Page, JSX.Element> = new Map<Page, JSX.Element>();
Routes.set(Page.GAME, <Game/>)
Routes.set(Page.LOGIN, <Login/>)
export default Routes

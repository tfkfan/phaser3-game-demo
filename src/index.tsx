import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {loadIcons} from './config/icon-loader';
import App from "./app";
import  "./controls";
loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                {/* <ThemeProvider theme={muiTheme}> */}
                <Component />
                {/* </ThemeProvider> */}
            </Provider>
        </React.StrictMode>,
        rootEl
    );

render(App);

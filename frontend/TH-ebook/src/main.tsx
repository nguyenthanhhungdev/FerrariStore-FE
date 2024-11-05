import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container!);
import store from './store/store.ts'
import {Provider} from 'react-redux'

root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>
);
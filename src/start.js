import React from 'react';
import ReactDOM from 'react-dom';

// ========== ======== PAGES WE IMPORT ============ ===========

// import LandingPage from "./landing-page";
// import Login from "./login";
// import Register from "./register"
import App from "./app"
import Welcome from "./welcome"


/// ==== === === Additional import for REDUX ======== ========

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
); ////

// ============== ============ =========== =========== ============

let elem;

if (location.pathname == "/welcome") {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    )
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    )
}


ReactDOM.render(elem, document.querySelector("main"));

import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./landing-page";
import Login from "./login";
import Register from "./register";

export default class Welcome extends React.Component {

    render () {
        return (
            <BrowserRouter>
                <div className="router">                 
                    <Route exact path="/welcome" component={LandingPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </div>
            </BrowserRouter>
        );
    }
}

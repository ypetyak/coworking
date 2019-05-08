import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";

import { userInfo } from "./actions.js";
// ========= ======== IMPORT COMPONENTS ========== ========= //

import Menu from "./menu"
import HomeProfile from "./home-profile"
import Profile from "./profile"
import FindEvent from "./find-event"
import EventManager from "./EventManager"
// ========= ======== ========

class App extends React.Component {


    componentDidMount() {
        this.props.dispatch(userInfo())

    }

    render() {
        return (
            <div className="mainBoxInApp">
                <BrowserRouter>
                    <div className="mainBoxInApp">
                        <div className="menuInAppBox">
                            <Menu />
                        </div>
                        <div className="contentBoxInApp">

                            <div className="routesInApp">
                                <Route
                                    exact
                                    path="/home"
                                    component={HomeProfile}
                                />
                                <Route
                                    exact
                                    path="/profile"
                                    component={Profile}
                                />
                                <Route
                                    exact
                                    path="/event"
                                    component={FindEvent}
                                />
								<Route
                                    exact
                                    path="/eventManager"
                                    component={EventManager}
                                />
                            </div>

                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state in user in Menu:", state);
    return {
        user: state.user
    };
};

// return {
//     friends: state.friends.filter(user => user.status == 2),
//     wannabes: state.friends.filter(user => user.status == 1)
// };

export default connect(mapStateToProps)(App);


// <div className="menuInAppBox">
//     <div className="menuInApp">
//         <div className="logoInApp">
//             <h1 className="fakeLogoInApp"> CH </h1>
//         </div>
//         <div className="functionalityTabInApp">
//             <a href="/map"><button className="appMenuButton"> Find a place </button></a>
//             <a href="/home"><button className="appMenuButton"> Your Home </button></a>
//             <a href="/events"><button className="appMenuButton"> Events </button></a>
//
//         </div>
//         <div className="profileLinkinApp">
//             <a href="/profile"><button className="appMenuButton"> Profile </button></a>
//             <img src="" className="profileImageInAppMenu"></img>
//         </div>
//     </div>
// </div>
//

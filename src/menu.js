import React from "react";
import { connect } from "react-redux";

import { userInfo, logOut } from "./actions.js";
import { Link } from "react-router-dom";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userInfo());
    }

    logOut() {
        this.props.dispatch(logOut());
    }

    render() {
        if (!this.props.user) {
            return (
                <div> Loading... </div>
            );
        }
        return (
            <div className="menuInApp">
                <div className="logoInApp">
                    <h1 className="fakeLogoInApp"> CH </h1>
                </div>
                <div className="functionalityTabInApp">
                    <Link to="/event"><button className="appMenuButton"> Find a place </button></Link>
                    <Link to="/home"><button className="appMenuButton"> Your Home </button></Link>
                    <Link to="/eventManager"><button className="appMenuButton"> Events </button></Link>

                </div>
                <div className="profileLinkinApp">
                    <Link to="/profile"><button className="appMenuButton"> Profile </button></Link>
                    <a href="/welcome"><button className="appMenuButton" onClick={this.logOut}> Logout </button></a>
                    <img src="" className="profileImageInAppMenu"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Menu);

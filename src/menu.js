import React from "react";
import { connect } from "react-redux";
import axios from 'axios';

import { userInfo, logOut } from "./actions.js";
import { Link } from "react-router-dom";

class Menu extends React.Component {

	constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(userInfo())

    }

	logOut() {
		this.props.dispatch(logOut())
	}

    render() {
        console.log("We are in our component for MENU: ", this.props);
        if (!this.props.user) {
            return (
                <div> Loading... </div> // you can replace it with some funny or useful image/text
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
					<a href="/"><button className="appMenuButton" onClick={this.logOut}> Logout </button></a>
                    <img src="" className="profileImageInAppMenu"></img>
                </div>
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

export default connect(mapStateToProps)(Menu);

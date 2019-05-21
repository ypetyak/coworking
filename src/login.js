import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Function to send input
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/main");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    render() {
        return (
            <div className="registerOrLogin">
                <div className="headerForLandingPage">
                    <div className="logoInHeader">
                        <h1>
                            Coworking Homes
                        </h1>
                        <div className="lineInHeader"></div>
                    </div>
                    <div className="menuInHeader"></div>
                    <div className="main-menu-button">
                        <Link to="/welcome"><button className="mainPageButtonInLogin"> Main Page </button></Link>
                    </div>
                </div>
                <div className="inputFieldsinLoginOrRegister">
                    <div className="LoginText">
                        <p> Welcome back :-) </p>
                    </div>
                    {this.state.error && (
                        <div className="error">Error! Try Again.</div>
                    )}
                    <input
                        onChange={this.handleChange}
                        name="email"
                        className="inputInLoginOrRegister"
                        placeholder="Email"
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        className="inputInLoginOrRegister"
                        placeholder="Password"
                    />
                    <button onClick={this.submit} className="buttonInLoginOrRegister">
                        Login
                    </button>

                    <h2 className="youStillCanRegister">
                        Don't have an account? Register
                        <a href="/register"> Here </a>
                    </h2>
                </div>
            </div>
        );
    }
}

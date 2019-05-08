import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        console.log("These: ", this.first, this.email);
        axios
            .post("/registration", {
                first: this.first,
                last: this.last,
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
                    <div className="registerText">
                        <p> Become part of our community & start coworking in Berlin! </p>
                    </div>
                    {this.state.error && <div className="error">TRY AGAIN</div>}
                    <input
                        onChange={this.handleChange}
                        name="first"
                        className="inputInLoginOrRegister"
                        placeholder="First Name"
                    />
                    <input
                        onChange={this.handleChange}
                        name="last"
                        className="inputInLoginOrRegister"
                        placeholder="Last Name"
                    />
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
                        Register
                    </button>

                    <h2 className="youStillCanRegister">
                        Already Registered? Login <a href="/login"> Here </a>
                    </h2>
                </div>
            </div>
        );
    }
}

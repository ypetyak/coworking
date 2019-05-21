import React from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends React.Component {

    render() {
        return (
            <div className="mainBox">
                <div id="start" className="headerForLandingPage">
                    <div className="logoInHeader">
                        <h1>
                            Coworking Homes
                        </h1>
                        <div className="lineInHeader"></div>
                    </div>
                    <div className="menuInHeader"></div>
                    <div className="loginLogoutinHeader">
                        <Link to="/login"><button className="loginButton"> Login </button></Link>
                        <Link to="/register"><button className="loginButton"> Register </button></Link>
                    </div>
                </div>
                <div className="landingPageIntro">
                    <h2 className="introTitile"> Coworking Homes </h2>
                    <p className="introText"> We built community, not an office. </p>
                    <Link to="/register"><button className="introButton">Join Us!</button></Link>
                </div>
                <div className="landingPageInfoFirst">
                    <div className="landingPageInfoFirstText">
                        <p className="textLine"> You tried to escape office but endup in the office environment anyway? </p>
                        <p className="textLine"> You have to pay from your own pocket for the corner space similar you run away from? </p>
                        <p className="textLine"> It's time to reconsider what coworing space is! And to make friends, not another LinkedIn connection. </p>
                    </div>
                    <div className="landingPageInfoFirstPhoto">
                        <img className="imageInLandingPageInfoFirst" src="./stockphoto2.jpg" alt="happy people"></img>
                    </div>
                </div>
                <div className="breakingLine"></div>
                <h2 className="header-second-page"> Be happy to work together! </h2>
                <div className="landingPageInfoSecond">
                    <div className="happyCustomer">
                        <img className="imageInLandingPageInfoSecond" src="./happyCustomer1.jpg" alt="Happy Customer 1"></img>
                        <p className="happyCustomerName"> John Doe </p>
                        <p className="happyCustomerReview"> "Finally! The environment where you can work in comfort!" </p>
                    </div>
                    <div className="happyCustomer">
                        <img className="imageInLandingPageInfoSecond" src="./happyCustomer2.jpg" alt="Happy Customer 1"></img>
                        <p className="happyCustomerName"> Samantha Bee </p>
                        <p className="happyCustomerReview"> "I managed to finish a week of work in just three days!" </p>
                    </div>
                    <div className="happyCustomer">
                        <img className="imageInLandingPageInfoSecond" src="./happyCustomer3.jpg" alt="Happy Customer 1"></img>
                        <p className="happyCustomerName"> Patrick Melrose  </p>
                        <p className="happyCustomerReview"> "Me and my new buddies go to the pub after work :-) "</p>
                    </div>
                </div>
                <div className="landingPageAbout">
                    <h2 className="aboutUsHeader"> About Us: </h2>
                    <p className="aboutUsText"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Molestie nunc non blandit massa enim nec dui nunc mattis. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Sit amet massa vitae tortor condimentum lacinia quis vel eros.</p>

                </div>
                <div className="landingPageFooter">
                    <a href="#start"><button className="go-top-button">Top <i className="fas fa-arrow-up"></i></button></a>
                    <div className="socialNetworksIcons">
                        <i className="fab fa-facebook-square fa-4x social-icons"></i>
                        <i className="fab fa-instagram fa-4x social-icons"></i>
                        <i className="fab fa-twitter-square fa-4x social-icons"></i>
                        <i className="fab fa-pinterest-square fa-4x social-icons"></i>
                    </div>
                </div>
            </div>
        );
    }
}

import React from "react";
import { connect } from "react-redux";

import { userInfo, updateUserProfile, photoUploadForprofile } from "./actions.js";
// import { Link } from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditProf: false,

        };

        this.setUserProfile = this.setUserProfile.bind(this);
        this.toggleDesc = this.toggleDesc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this)


    }



    componentDidMount() {
        console.log("And...Action!");
        this.props.dispatch(userInfo());
    }

    setUserProfile() {
        console.log("Master of the world", this.state);
        this.props.dispatch(updateUserProfile(this.state))

        this.setState({
            showEditProf: !this.state.showEditProf,

        });
    }

    uploadPhoto(e) {
        let file;
        console.log("Our targete", e.target.files[0]);
        e.preventDefault();
        file = e.target.files[0];

        const fd = new FormData();

        fd.append("file", file);

        this.props.dispatch(photoUploadForprofile(fd))
        }


    toggleDesc() {
        console.log("toggle stuff");

        this.setState({
            showEditProf: !this.state.showDesc,
            first: this.props.user.first,
            last: this.props.user.last,
            bio: this.props.user.bio,
            profession: this.props.user.profession
        });

        console.log("toggle stuff", this.state);
    }

    handleChange(e) {
        console.log("Type! Type! Type!");
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        console.log("We are in our component for USER: ", this.props.user);
        if (!this.props.user) {
            console.log("Loading...")
            return (

                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }

        if (!this.props.user.photo_url) {
            this.props.user.photo_url = "./profile1.jpg"
        }


        return (
            <div className="userProfileBox">
                <img className="photoOfTheRoom" src={this.props.user.photo_url} alt="Your Profile Photo"/>
                <div className="profileInfoBox">
                    {this.state.showEditProf ? (
                        <div className="inputFieldsForHouse">
                            <input className="updateAddress"
                                onChange={this.handleChange}
                                name="first"
                                defaultValue={this.props.user.first}
                                placeholder="First Name"
                            />
                            <input className="updateAddress"
                                onChange={this.handleChange}
                                name="last"
                                defaultValue={this.props.user.last}
                                placeholder="Last Name"
                            />
                            <textarea className="updateDesc"
                                onChange={this.handleChange}
                                name="bio"
                                defaultValue={this.props.user.bio}
                                placeholder="Your Story"
                            />
                            <input className="updateAddress"
                                onChange={this.handleChange}
                                name="profession"
                                defaultValue={this.props.user.profession}
                                placeholder="Your Profession"
                            />
                            <p className="updateHouseProfile" onClick={this.setUserProfile} > Update </p>
                        </div>

                    ) : (
                        <div className="houseProfileInfoFields">
                            <h1 className="houseName"> {this.props.user.first + " " + this.props.user.last} </h1>
                            <p className="houseDescription"> {this.props.user.bio} </p>
                            <p className="numberOfPeopleInHouse"> {this.props.user.profession}</p>

                            <div className="buttonsInHouseProfile">
                                <p className="editHouseProfle" onClick={this.toggleDesc}> Edit Your Profile </p>
                                    <input
                                        id="myInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={this.uploadPhoto}
                                    />
                                <label className="editHouseProfle" onClick={this.uploadPhoto} htmlFor="myInput"> Upload Your Photo </label>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state in USER in Menu:", state);
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Profile);

import React from "react";
import { connect } from "react-redux";

import { houseProfile, updateHouseProfile, createEvent, eventsCreated, deleteEvent, photoUploadForHouse } from "./actions.js";
import { Link } from "react-router-dom";

class HomeProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDesc: false,
            datePopup: false

        };
        this.setHouseProfile = this.setHouseProfile.bind(this);
        this.toggleDesc = this.toggleDesc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setDatePopup = this.setDatePopup.bind(this);
        this.toggleDate = this.toggleDate.bind(this);
        this.deleteThisEvent = this.deleteThisEvent.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this)
    }



    componentDidMount() {
        console.log("And...Action!");
        this.props.dispatch(houseProfile())
        this.props.dispatch(eventsCreated())


    }

    deleteThisEvent(e) {
        console.log("What is E: ", e);

		var data = {
			eventId: e
		}

      this.props.dispatch(deleteEvent(data))

	  this.setState(this.state);
    }

    setDatePopup() {
        var data = {
            eventDate: this.state.dayToCowork,
            houseId: this.props.house.id
        }
        console.log("Date: ", data);
        this.props.dispatch(createEvent(data))

        this.setState({
            datePopup: !this.state.datePopup,

        });

    }

    toggleDate() {
        this.setState({
            datePopup: !this.state.datePopup,

        });
    }

    toggleDesc() {
        console.log("toggle stuff");

        this.setState({
            showDesc: !this.state.showDesc,
            house_name: this.props.house.house_name,
            description: this.props.house.description,
            space: this.props.house.space,
            address: this.props.house.address,
            postcode: this.props.house.postcode

        });

        console.log("toggle stuff", this.state);
    }

    uploadPhoto(e) {
        let file;
        console.log("Our targete", e.target.files[0]);
        e.preventDefault();
        file = e.target.files[0];

        const fd = new FormData();

        fd.append("file", file);

        this.props.dispatch(photoUploadForHouse(fd))
        }

    setHouseProfile() {
        console.log("Master of the world", this.state);
        this.props.dispatch(updateHouseProfile(this.state))

        this.setState({
            showDesc: !this.state.showDesc,

        });
    }

    handleChange(e) {
        console.log("Type! Type! Type!");
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log("We are in our component for home: ", this.props.house);
        if (!this.props.house || !this.props.events) {
            console.log("Loading...")
            return (

                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }

        if (!this.props.house.photo) {
            this.props.house.photo = "./stockphoto4.jpg"
        }

        return (
            <div className="houseProfileBox">

                <div className="houseProfile">

                    <img className="photoOfTheRoom" src={this.props.house.photo} alt="Photo Of The Room"></img>

                    <div className="houseProfileInfo">
                        {this.state.showDesc ? (
                            <div className="inputFieldsForHouse">
                                <input className="updateHouseName"
                                    onChange={this.handleChange}
                                    name="house_name"
                                    defaultValue={this.props.house.house_name}
                                    placeholder="House Name"
                                />
                                <textarea className="updateDesc"
                                    onChange={this.handleChange}
                                    name="description"
                                    defaultValue={this.props.house.description}
                                    placeholder="House Description"
                                />

                                <input className="updateSpaceAvailable"
                                    onChange={this.handleChange}
                                    name="space"
                                    defaultValue={this.props.house.space}
                                    placeholder="Space Available"
                                />

                                <input className="updateAddress"
                                    onChange={this.handleChange}
                                    name="address"
                                    defaultValue={this.props.house.address}
                                    placeholder="Address"
                                />
                                <input className="updatePostcode"
                                    onChange={this.handleChange}
                                    name="postcode"
                                    defaultValue={this.props.house.postcode}
                                    placeholder="Postcode"
                                />
                                <p className="updateHouseProfile" onClick={this.setHouseProfile} > Update </p>
                            </div>

                        ) : (
                            <div className="houseProfileInfoFields">
                                <h1 className="houseName"> {this.props.house.house_name} </h1>
                                <p className="houseDescription"> {this.props.house.description} </p>
                                <p className="numberOfPeopleInHouse"> {this.props.house.space} places available.</p>
                                <p className="houseAddress"> Address: {this.props.house.address}</p>
                                <p className="postcode"> Postcode: {this.props.house.postcode}</p>
                                <div className="buttonsInHouseProfile">
                                    <p className="editHouseProfle" onClick={this.toggleDesc}> Edit House Profile </p>

                                            <input
                                                id="myInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={this.uploadPhoto}
                                            />
                                        <label className="editHouseProfle" onClick={this.uploadPhoto} htmlFor="myInput"> Upload House Photo </label>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="selectTime">
                    <p className="buttonForCoworkingEvent" onClick={this.toggleDate} > Choose a day for coworking :) </p>
                    {this.state.datePopup ? (
                        <div className="datePopupInHouse">
                            <div className ="chooseDateWindow">
                                <h2 className="textInChooseDate"> Choose the day when you want to be a host: </h2>
                                <input className="dataInput" onChange={this.handleChange} type="date" name="dayToCowork"/>
                                <div className="buttonsInChoosingDate">
                                    <p className="editHouseProfle" onClick={this.toggleDate}> Close </p>
                                    <p className="editHouseProfle" onClick={this.setDatePopup}> Set Date </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="yourEventsBox">

                        {this.props.events.map(event => (
                            <div key={event.id} className="yourEvents">
                                <Link to="/events/{event.id}" className="goToEventButton"> Go to Event Page </Link>
                                <p className="eventDateInEventBox">{event.eventdate}</p>
                                <p className="deleteEventButton" onClick={() => {this.deleteThisEvent(event.id)}}> Delete Event </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state in HOUSE in Menu:", state);
    return {
        house: state.house,
        events: state.events
    };
};









// return {
//     friends: state.friends.filter(user => user.status == 2),
//     wannabes: state.friends.filter(user => user.status == 1)
// };


// {props.showBio ? (
//     <textarea className="updateBio"
//         onKeyDown={props.setBio}
//         defaultValue={props.bio}
//     />
// ) : (
//     <p className="profileBio"> {props.bio} </p>
// )}
// <p className="updateBioButton" onClick={props.toggleBio}>Update your Bio </p>

export default connect(mapStateToProps)(HomeProfile);

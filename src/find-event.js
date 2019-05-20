import React from "react";
import { connect } from "react-redux";

import Geocode from "react-geocode";

import { getPlacesByDate, updatedWithLocation } from "./actions.js";

import EventMapContainer from "./eventMapContainer";
// import { Link } from "react-router-dom";

class FindEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditProf: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.findPlaces = this.findPlaces.bind(this);
        this.geocodeStuff = this.geocodeStuff.bind(this)
    }



    componentDidMount() {

    }

    geocodeStuff(events) {


        const eventsSelected = events.map(event => {
             Geocode.setApiKey("AIzaSyBAnvGRe6yO7UmZB30kpfpc6CpagjNgzUE");

             Geocode.enableDebug();


             Geocode.fromAddress(event.address + ", " + "Berlin, " + event.postcode).then(
               response => {
                 const { lat, lng } = response.results[0].geometry.location;
                 // console.log("Geocding Stuff",lat, lng);
                 event.latitude = lat;
                 event.longtitude = lng;


               },


               error => {
                 console.error(error);
               }
             );
})
        // this.props.dispatch(updatedWithLocation(eventsSelected))


    }

    findPlaces() {
        console.log("Find Find Find", this.state.dayToCowork);
        var date = this.state.dayToCowork;
        this.props.dispatch(getPlacesByDate(date))


    }

    handleChange(e) {
        console.log("Type! Type! Type!");
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        console.log("We are in our component for EVENT MAP: ", this.props);
        if (!this.props) {
            console.log("Loading...")
            return (

                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }

        if (this.props.eventsSelected) {
            this.geocodeStuff(this.props.eventsSelected)
        }



        return (
            <div className="eventBox">
                <div className="chooseDateBoxInFindEvent">
                    <p className="textInChooseDateInFindEvent"> Choose the day: </p>
                    <input className="dataInputInFindEvent" onChange={this.handleChange} type="date" name="dayToCowork"/>
                    <button className="findPlacesAtSelectedDay" onClick={this.findPlaces}> Find Places </button>
                </div>
                <div className="mapBoxInFindEvent">
                    <EventMapContainer
                            eventsSelected={this.props.eventsSelected}
                        />
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state in EVENTS in Find Event:", state);
    return {
        events: state.events,
        eventsSelected: state.eventsSelected
    };
};

export default connect(mapStateToProps)(FindEvent);

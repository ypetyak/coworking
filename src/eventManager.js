import React from "react";
import { connect } from "react-redux";

import { createEvent, eventsCreated, deleteEvent } from "./actions.js";
import { Link } from "react-router-dom";

class EventManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.deleteOurEvent = this.deleteOurEvent.bind(this);

    }



    componentDidMount() {
        this.props.dispatch(eventsCreated());

    }

    deleteOurEvent(e) {
        console.log("What is E: ", e);

        var data = {
            eventId: e
        };

        this.props.dispatch(deleteEvent(data));
    }


    render() {
        if (!this.props.events) {
            return (
                <div> Loading... </div>
            );
        }

        return (
            <div className="houseProfileBox">
                <h1 className="title-event-manager"> You are hosting next events: </h1>
                <div className="yourEventsBox">
                    {this.props.events.map(event => (
                        <div key={event.id} className="yourEvents">
                            <Link to="/events/{event.id}" className="goToEventButton"> Go to Event Page </Link>
                            <p className="eventDateInEventBox">{event.eventdate}</p>
                            <p className="deleteEventButton" onClick={() => { this.deleteOurEvent(event.id); }}> Delete Event </p>
                        </div>
                    ))}
                </div>
                <h1 className="title-event-manager"> You come to next events: </h1>
                <div className="yourEventsBox">

                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        events: state.events
    };
};

export default connect(mapStateToProps)(EventManager);

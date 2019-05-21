import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import EventMarker from "./event-marker";

const EventMap = withScriptjs(withGoogleMap((props) => {

    const markers = props.doctors.map(doctor => <EventMarker
        key={doctor.uid}
        doctor={doctor}
        location={{ lat: doctor.closestPractice.lat, lng: doctor.closestPractice.lon }}
    />);

    return (
        <GoogleMap
            defaultZoom={14}
            center={{ lat: 42.3601, lng: -71.0589 }}
        >
            {markers}
        </GoogleMap>
    );
}
));

export default EventMap;

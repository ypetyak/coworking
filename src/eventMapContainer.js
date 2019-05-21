import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import React from 'react';

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

export class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
				
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.timeRender = false;
    }

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClick() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    closePopUp() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    }

    render() {
        const style = { width: '800px', height: '500px', "margin-left": "150px" };

        if (!this.props.loaded || !this.props.eventsSelected) {
            return (
                <div className="realMapBox">
                    <Map
                        google={this.props.google}
                        style={style}
                        zoom={12}
                        initialCenter={
                            {
                                lat: 52.520008,
                                lng: 13.404954
                            }
                        }
                        onMapClick={this.onMapClick}>
                    </Map>
                </div>
            );
        }

        if (!this.timeRender) {
            setTimeout(() => {
                this.timeRender = true;
                this.forceUpdate();
            }, 2000);
        }


        return (
            <div className="realMapBox">
                <Map
                    google={this.props.google}
                    style={style}
                    zoom={12}
                    initialCenter={
                        {
                            lat: 52.520008,
                            lng: 13.404954
                        }
                    }

                    onMapClick={this.onMapClick}>

                    {this.props.eventsSelected.map(event => (
                        <Marker
                            key={event.eventid}
                            name={event.name}
                            position={{ lat: event.latitude, lng: event.longtitude }}
                            onClick={this.onMarkerClick}
                        />
                    ))}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}>
                        <div className="map-popup-house">
                            <h1>{this.props.eventsSelected[0].house_name}</h1>
                            <p> Space Available: {this.props.eventsSelected[0].space}</p>
                            <img className="imageInPopup" src={this.props.eventsSelected[0].photo} />
                            <button className="button-in-popup" onClick={this.onInfoWindowClose}> Cowork here! </button>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: secrets.MAPS_KEY
})(Container);


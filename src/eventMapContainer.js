import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import Geocode from "react-geocode";

import React from 'react';

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
		// this.geocodeStuff = this.geocodeStuff.bind(this)

    }

	componentWillMount() {
		this.timeRender = false

	}

componentDidMount() {
}




// ========== ========== Geocoding Stuff ================ =====

//
// geocodeStuff(events) {
//
//
// 	var eventArray = []
// 	const eventsSelected = events.map(event => {
// 		 Geocode.setApiKey("AIzaSyBAnvGRe6yO7UmZB30kpfpc6CpagjNgzUE");
//
// 		 Geocode.enableDebug();
//
//
// 		 Geocode.fromAddress(event.address + ", " + "Berlin, " + event.postcode).then(
// 		   response => {
// 			 const { lat, lng } = response.results[0].geometry.location;
// 			 // console.log("Geocding Stuff",lat, lng);
// 			 event.latitude = lat;
// 			 event.longtitude = lng;
// 			 eventArray.push(event)
// 			 this.setState({
// 				 selectedEvents: eventArray
// 			 })
//
// 		   },
//
//
// 		   error => {
// 			 console.error(error);
// 		   }
// 		 );
// 	 })
// }


// ============ =========== =========== =============


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
		console.log("Close, cLose!");
		this.setState({
			showingInfoWindow: false,
			activeMarker: null
		});
	}

    render() {
		console.log(this.props.google);
		console.log("Our PROPS in MAP: ", this.props);
		console.log("Our State in Map: ", this.state);
		console.log("JSON NOnsense", JSON.stringify(this.props.eventsSelected));

        const style = {width: '800px', height: '500px', "margin-left": "150px"}

        if (!this.props.loaded || !this.props.eventsSelected) {
          return(
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
		  )
        }

		// if(!this.props.eventsSelected) {
		// 	return <div>Choose the Date </div>;
		// }

		if (!this.timeRender)
		setTimeout(() => {
			this.timeRender = true
			this.forceUpdate();
		}, 2000)



// style={{marginRight: spacing + 'em'}}



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
					   position={{lat: event.latitude, lng: event.longtitude}}
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
						  <img className="imageInPopup" src={this.props.eventsSelected[0].photo}/>
							<button className="button-in-popup" onClick={this.onInfoWindowClose}> Cowork here! </button>
						  </div>
				  </InfoWindow>
			  </Map>

			</div>
		)


    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAnvGRe6yO7UmZB30kpfpc6CpagjNgzUE'
})(Container)

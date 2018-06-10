import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import { Venue } from './Venue';
import { Search } from './Search';

class App extends Component {

	constructor() {
		super();

		this.state = {
			venues: [],
			isEmpty: false,
			isBusy: false,
			isGeolocationBlocked: false
		};
	}

	getLocation(success, fail) {
		navigator.geolocation.getCurrentPosition(
			function(location) {
				success(location.coords.latitude + ',' + location.coords.longitude)
			},
			function(error){
				fail(error);
			}
		)
	}

	handleSubmit(query) {
		this.getVenues(query);
	}

	getVenues(query) {
		let setVenueState = this.setState.bind(this);
		const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
		this.getLocation(function (latlong) {
			const params = {
				client_id: 'NT3MZ2KEJC52FWXV31AH05SOPPAT123KVKHJGE5WDIBZBZCI',
				client_secret: 'XOG1C2GWWQ412HJUSMPJVJSGLNRDI5KFXHFDWQ1K4KGHIINF',
				limit: 100,
				query: query,
				v: '20180610',
				ll: latlong
			};

			setVenueState({venues: [], isGeolocationBlocked: false, isBusy: true});

			fetch(venuesEndpoint + new URLSearchParams(params), {
				method: 'GET'
			}).then(response => response.json()).then(response => {
				setVenueState({
					venues: response.response.groups[0].items,
					isEmpty: response.response.groups[0].items.length === 0,
					isBusy: false
				});
			}).catch(function(error) {
				setVenueState({isBusy: false});
				console.error('Request failed', error);
			});
		},
		function(error){
			setVenueState({isGeolocationBlocked: true});
			console.error('Geolocation unavailable', error);
		});
	}

	componentDidMount() {
		this.getVenues("");
	}

	render() {
		let venueList;
		if(this.state.isGeolocationBlocked) {
			venueList = <div className="empty-list-warning">
				Geolocation is unavailable.<br/>
				Please try to geolocate yourself better.
			</div>
		} else if(this.state.isBusy) {
			venueList = <div className="loading-list">
				<img src="../ripple.svg" alt="Loading" />
			</div>
		} else if(this.state.isEmpty) {
			venueList = <div className="empty-list-warning">
				Oops, looks like we haven't found what you asked for.<br/>
				Your request has been redirected to the Universe.<br/>
				Please stand by.
			</div>
		} else {
			venueList = this.state.venues.map((item, i) =>
				<Venue
					key={i}
					name={item.venue.name}
					distance={item.venue.location.distance}
					address={item.venue.location.address}
				/>
			);
		}

		return (
			<div className="main">
				<Search onSubmit={(value)=>this.handleSubmit(value)}/>
				<div className="venue-list">
					{venueList}
				</div>
			</div>
		);
	}
}
export default App;

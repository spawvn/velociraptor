import React, { Component } from 'react';

export class Venue extends Component {
	render() {
		const distanceFormatted = this.props.distance ?
			<div className="venue-item-distance">{(this.props.distance / 1000).toFixed(1)} km</div> : "";

		const addressQueryURL = "http://maps.google.com/maps?q=" + encodeURIComponent(`${this.props.name}, ${this.props.address}`);

		return <div className="venue-item">
			<div className="venue-item-name">{this.props.name}</div>
			{distanceFormatted}
			<a className="venue-item-address" href={addressQueryURL} target="_blank">{this.props.address}</a>
		</div>
	}
}
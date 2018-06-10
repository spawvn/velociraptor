import React, { Component } from 'react';

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state.value);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<form className="search-form" onSubmit={this.handleSubmit}>
				<input id="venueType" className="venue-search-input" onChange={this.handleChange} value={this.state.value} placeholder="What are you looking for?	" />
				<input type="submit" className="venue-search-submit" value="Search" />
			</form>
		);
	}
}
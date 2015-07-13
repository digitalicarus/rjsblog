"use strict";

import React        from 'react';
import Reflux       from 'reflux';
import Router       from 'react-router';

import Actions      from 'appRoot/actions/actions';
import SessionStore from 'appRoot/stores/sessionContext';
 
let Link = Router.Link;

export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session'),
		Router.Navigation
	],
	logOut: function () {
		Actions.logOut();
		// from the navigation mixin
		this.transitionTo('/');
	},
	getGreeting: function () {
		var greeting = '';
		if (this.state.session.username) {
			greeting = 'Hello' + this.state.session.firstName ? 
				this.state.session.firstName : this.state.session.username
				;
			greeting += ', ';
		}

		return greeting;
	},
	componentWillMount: function () {
		var searchVal = this.context.router.getCurrentQuery().query;
		Actions.search(searchVal);
	},
	search: function () {
		var searchVal = this.refs.search.getDOMNode().value;
		Actions.search(searchVal);
	},
	render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
					<input 
						ref="search" 
						type="search" 
						placeholder="search" 
						defaultValue={this.state.initialQuery}
						onChange={this.search} />
						{
							this.state.session.loggedIn ? 
								(<Link to="create-post">
									Hello {this.state.session.username}, write something!
								</Link>) : 
								<Link to="create-user">Join</Link>
						}
						{
							this.state.session.loggedIn ? 
								<a onClick={this.logOut}>Log Out</a> :
								<Link to="login">Log In</Link> 
						}
				</section>
			</header> 
		);
	}
});


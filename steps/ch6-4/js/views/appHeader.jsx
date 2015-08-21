"use strict";

import React        from 'react';
import Reflux       from 'reflux';
import Router       from 'react-router';

import Actions      from 'appRoot/actions';
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
	render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
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


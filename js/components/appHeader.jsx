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
		this.transitionTo('/');
	},
	render: function () {
		console.log(this.state.session);
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
					<input type="search" placeholder="search" />
					{
						this.state.session.loggedIn ? 
							<Link to="create-post">Write</Link> : 
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


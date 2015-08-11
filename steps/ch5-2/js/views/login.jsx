import React   from 'react';
import Reflux  from 'reflux';
import Router  from 'react-router';

export default React.createClass({
	mixins: [
		Router.Navigation
	],
	logIn: function (e) {
		this.transitionTo('/');
	},
	render: function () {
		return (
			<form className="login-form" onSubmit={this.logIn}>
				<button type="submit">Log In</button>
			</form>
		);
	}
});
 

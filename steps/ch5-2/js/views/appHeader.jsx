import React   from 'react';
import Reflux  from 'reflux';
import Router  from 'react-router';

let Link = Router.Link;

export default React.createClass({
	render: function () {
		return (
			<header className="app-header">
				app header
				<Link to="login">Log In</Link>
			</header>
		);
	}
});
 

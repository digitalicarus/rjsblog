"use strict";

import React        from 'react';
import Router       from 'react-router';

let Link = Router.Link;

export default React.createClass({
   render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
					<Link to="create-user">Join</Link>
					<Link to="login">Log In</Link> 
				</section>
			</header> 
		);
	}
});


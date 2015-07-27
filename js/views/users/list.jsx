import React     from 'react';
import Reflux    from 'reflux';
import Router    from 'react-router';

import UserStore from 'appRoot/stores/users';

// This reflux demo app recommended https://github.com/echenley/react-news
let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   NotFoundRoute = Router.NotFoundRoute
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
	mixins: [
		Reflux.connect(UserStore, 'users')
	],
	render: function () {
		// this.state.users may not be initialized when render is first invoked
		var userList = this.state.users ? this.state.users.map(function (v) {
			return (
				<li key={v.id}>
					<Link to="view-user" params={{ userId: v.id }}>
						<img className="profile-img small" src={v.profileImageData}/>
						<div className="user-meta">
							{v.blogName}
							<small>
								{v.firstName}&nbsp;{v.lastName}
							</small>
						</div>
					</Link>
				</li>
			);
		}) : [];

		return <ul className="user-list">{userList}</ul>;
	}
});
 

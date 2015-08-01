import React      from 'react';
import Reflux     from 'reflux';
import Router     from 'react-router';
import Moment     from 'moment';

import Actions    from 'appRoot/actions/actions';

import UserList   from 'appRoot/views/users/list';
import PostList   from 'appRoot/components/posts/list';

// This reflux demo app recommended https://github.com/echenley/react-news
let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   NotFoundRoute = Router.NotFoundRoute
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
   render: function () {
		return (
			<div className="post-list-view">
				<PostList />
				<div className="users-list">
					<UserList />
				</div>
			</div>
		);
	}
});
 

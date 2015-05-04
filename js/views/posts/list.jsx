import React       from 'react';
import ReactAddons from 'react-addons';
import Router      from 'react-router';
import Reflux      from 'reflux';

import Actions     from 'appRoot/actions/actions';
import PostStore   from 'appRoot/stores/posts';

let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
	componentWillMount: function () {
		Actions.getPosts();
	},
	render: function () {
		return (
			<div>BLOG LIST
				<RouteHandler />
			</div>
		);
	}
});


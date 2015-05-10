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
	mixins: [
		Router.Navigation,
		Reflux.listenTo(PostStore, 'postStoreUpdate')
	],
	/**
	 * postStoreUpdate used to listen to posts that potentially changed
	 * out of band from the async actions
	 */
	postStoreUpdate: function (updatedPosts) {
		// see if updates are in our current page -- 
		// TODO: mixins for listeners to store
		console.log("list got post store update", updatedPosts);
	},
	getInitialState: function () {
		return { loading: true };
	},
	getPostsByPage: function (page) {
		Actions
			.getPostsByPage(page)
			.then(function (posts) {
				this.posts = posts;
			}.bind(this))
			// use array notation cause keyword 'catch'?
			.catch(function (err) { 
				this.setState({ fetchError: err });
			}.bind(this))
			; 
	},
	componentWillReceiveProps: function (nextProps) {
		this.getPostsByPage(nextProps.params.pageNum);
	},
	componentWillMount: function () {
		this.getPostsByPage(this.props.params.pageNum /* from router */);
	},
	render: function () {
		return (
			<div>
				{
					this.state.fetchError && 
					<strong>ERROR: {this.state.fetchError.message}</strong>
				}
				<RouteHandler />
			</div>
		);
	}
});


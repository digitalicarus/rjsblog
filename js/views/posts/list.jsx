import React      from 'react';
import Reflux     from 'reflux';
import Router     from 'react-router';
import Moment     from 'moment';

import Actions    from 'appRoot/actions/actions';

import PostStore  from 'appRoot/stores/posts';
import UserStore  from 'appRoot/stores/users';
import UserList   from 'appRoot/views/users/list';

import PostView   from 'appRoot/views/posts/view';

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
	getInitialState: function () {
		return {
			page: 1,
			posts: []
		};
	},
	componentWillMount: function () {
		this.getNextPage();

		window.addEventListener('scroll', this.onScroll);
	},
	componentWillUnMount: function () {
		window.removeEventListener('scroll', this.onScroll);
	},
	onScroll: function (e) {
		var body = document.body
		,   scrollDiff = Math.abs(body.scrollHeight - (body.scrollTop + body.clientHeight))
		;

		console.log('scroll');
		if (!this.state.loadingMore && scrollDiff < 100) {
			this.getNextPage();
		}
	},
	getNextPage: function () {
		this.setState({loadingMore: true});
		console.log('loading', this.state.page);

		Actions.getPostsByPage(this.state.page)
			.then(function (data) {
				//this.state.posts = this.state.posts.concat(data);
				console.log("DATA", data, this.state.posts);
				this.setState({
					loadingMore: false,
					posts: this.state.posts.concat(data),
					page: this.state.page + 1
				});
			}.bind(this)); 
	},
	render: function () {
		var postsUI = this.state.posts.map(function (post) {
			return <PostView post={post} mode="summary"/>;
		});

		return (
			<div className="post-list">
				<div className="post-list-container">
					<ul>
						{postsUI}
					</ul>
				</div>
				<div className="users-and-tags">
					<UserList/>
				</div>
			</div>
		);
	}
});
 

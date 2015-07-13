import React       from 'react';
import Reflux      from 'reflux';
import Router      from 'react-router';
import ClassNames  from 'classnames';
import Moment      from 'moment';

import Actions     from 'appRoot/actions/actions';

import PostStore   from 'appRoot/stores/posts';
import UserStore   from 'appRoot/stores/users';

import Session     from 'appRoot/stores/sessionContext';

let dateFormat    = 'MM/DD/YYYY HH:mm:ss'
,   RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
	mixins: [
		Reflux.connect(Session, 'session'),
		Reflux.connect(UserStore, 'users')
	],
	getInitialState: function () {
		return {
			post: this.props.post
		};
	},
	componentWillMount: function () {
		if (this.state.post) {
		} else {
			// get post from query params
			this.getPost();
		}
	},
	getUserFromPost: function (post) {

			return this.state.users.find(function (user) {
				return user.id === post.user;
			})

	},
	getPost: function () {
		if (this.isMounted()) {
			this.setState({loading: true});
		} else {
			this.state.loading = true;
		}

		Actions.getPost(this.props.params.postId)
		.then(function (data) {
			//this.state.posts = this.state.posts.concat(data);
			this.setState({
				loading: false,
				post: data
			});
		}.bind(this));  	
	},
	/**
	 * Post Title, if not defined the title of the blog
	 */
	getPostTitle: function (post) {
		return post.title || this.getUserFromPost(post).blogName;
	},
	render: function () {
		if (this.state.loading) { return <div>loading</div>; }
		var post = this.state.post
		,   user = this.getUserFromPost(post)
		,   name = user.firstName && user.lastName ? 
				user.firstName + ' ' + user.lastName : 
				user.firstName ?
				user.firstName : 
				user.username
		;
 
		return this.props.mode === 'summary' ? (
			// SUMMARY / LIST VIEW
			<li className="post-view-summary">
				<aside>
					<img className="profile-img small" src={user.profileImageData} />
					<div className="post-metadata">
						<strong>{this.getPostTitle(post)}</strong>
						<span className="user-name">{name}</span>
						<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
					</div>
				</aside>
				<summary dangerouslySetInnerHTML={{__html: post.summary}}></summary>
				&nbsp;
				<Link to="view-post" params={{ postId: post.id }}>read more</Link> 
				{
					user.id === this.state.session.id ? (
						<div>
							<Link to="edit-post" params={{ postId: post.id }}>
								<button>edit post</button>
							</Link>
						</div>
					) : ''
				}
			</li> 
		) : (
			// FULL POST VIEW
			<div className="post-view-full">
				<h2>
					<img className="profile-img" src={user.profileImageData} />
					<div className="post-metadata">
						<strong>{this.getPostTitle(post)}</strong>
						<span className="user-name">{name}</span>
						<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
					</div> 
				</h2>
				<section className="post-body" dangerouslySetInnerHTML={{__html: post.body}}>
				</section>
			</div>

		);
	}
});
 

"use strict";

import React     from 'react';
import Router    from 'react-router';

import CSS       from '../css/app.less';

import AppHeader from 'appRoot/components/appHeader';

import Login     from 'appRoot/views/login';

import PostList  from 'appRoot/views/posts/list';
import PostView  from 'appRoot/views/posts/view';
import PostEdit  from 'appRoot/views/posts/edit';

import UserList  from 'appRoot/views/users/list';
import UserView  from 'appRoot/views/users/view';
import UserEdit  from 'appRoot/views/users/edit';

// polyfills
import ArrayUtils from 'appRoot/vendor/polyfills/arrayutils';

let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   NotFoundRoute = Router.NotFoundRoute
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
// Components must be uppercase - regular DOM is lowercase
// https://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components
let AppLayout = React.createClass({
   render: function () {
		return (
			<div className="app-container">
				<AppHeader />
				<main>
					<RouteHandler { ...this.props } />
				</main>
			</div>
		);
	}
});

let routes = (
    <Route path="/" handler={ AppLayout }>
        <Route 
			name="list-posts"
			path="posts/:pageNum/?" 
			handler={ PostList } 
			ignoreScrollBehavior 
		/>
		<Route
			name="create-post"
			path="/post/create"
			handler={ PostEdit }
		/>
		<Route 
			name="edit-post" 
			path="/post/:postId/edit"
			handler={ PostEdit } 
		/>
        <Route 
			name="view-post"
			path="post/:postId"
			handler={ PostView } 
		/>
		<Route 
			name="list-users"
			path="/users" 
			handler={ UserList } 
		/>
		<Route
			name="create-user"
			path="/users/create"
			handler={ UserEdit }
		/>
		<Route 
			name="view-user"
			path="/users/:userId" 
			handler={ UserView } 
		/>
		<Route 
			name="edit-user"
			path="/users/:userId/edit" 
			handler={ UserEdit }
		/>
		<Route 
			name="login"
			path="/login" 
			handler={ Login }
		/>
		<DefaultRoute handler={ PostList } />
		<NotFoundRoute handler={ PostList } />
    </Route>
);

Router.run(routes, function(Handler, state) {
	// you can name the params in the handler what you want as an attr 
	// routeParams={ state.params }
	// but the handler will automatically receive the state.params 
	// as a prop called 'params'
    React.render(<Handler />, document.body);
});

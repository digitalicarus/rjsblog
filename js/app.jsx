"use strict";

import React     from 'react';
import Router    from 'react-router';

import CSS       from '../css/app.less';

import About     from 'appRoot/views/about';
import List      from 'appRoot/views/posts/list';
import Entry     from 'appRoot/views/posts/entry';

// This reflux demo app recommended https://github.com/echenley/react-news
let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
// Components must be uppercase - regular DOM is lowercase
// https://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components
let AppLayout = React.createClass({
   render: function () {
		return (
			<div className="app-container">
				<header>
				</header>
				<main>
					<RouteHandler { ...this.props } /*user={ this.state.user }*/ />
				</main>
			</div>
		);
	}
});

let routes = (
    <Route path="/" handler={ AppLayout }>
        <Route name="entry" path="/post/:postId" handler={ Entry } />
        <Route name="about" path="/about"        handler={ About } />
        <Route name="posts"   path="/posts">
			<DefaultRoute name="firstpage" handler={ List } />
			<Route path=":pageNum" handler={ List } ignoreScrollBehavior>
				<Route name="entryEmbed" path=":postId" handler={ Entry } ignoreScrollBehavior />
			</Route>
		</Route>
		<DefaultRoute handler={ List } />
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(<Handler params={ state.params } />, document.body);
});



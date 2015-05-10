"use strict";

import React         from 'react';
import Router        from 'react-router';

import CSS           from '../css/app.less';

import About         from 'appRoot/views/about';
import List          from 'appRoot/views/posts/list';
import Entry         from 'appRoot/views/posts/entry';

// This reflux demo app recommended https://github.com/echenley/react-news
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
        <Route name="about" path="/about"            handler={ About } />
        <Route name="entry" path="/entry/:entryId"   handler={ Entry } />
        <Route name="posts" path="/posts/:pageNum/?"   handler={ List } >
			<Route name="entryEmbed" path="entry/:entryId" handler={ Entry } />
		</Route>
		<NotFoundRoute handler={ List } />
    </Route>
);

Router.run(routes, function(Handler, state) {
	// can name the params in the handler what you want as an attr  routeParams={ state.params }
	// but the handler will automatically receive the state.params as a prop called 'params'
    React.render(<Handler />, document.body);
});



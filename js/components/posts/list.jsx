import React       from 'react/addons';
import Reflux      from 'reflux';
import Router      from 'react-router';
import Moment      from 'moment';
import Aug         from 'aug';

import Config      from 'appRoot/appConfig';
import Actions     from 'appRoot/actions';

import PostStore   from 'appRoot/stores/posts';
import UserStore   from 'appRoot/stores/users';
import SearchStore from 'appRoot/stores/search';

import PostView    from 'appRoot/views/posts/view';

import Loader      from 'appRoot/components/loader';

// This reflux demo app recommended https://github.com/echenley/react-news
let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   NotFoundRoute = Router.NotFoundRoute
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
	mixins: [
		Reflux.connect(UserStore, 'users'),
		Reflux.connect(SearchStore, 'search')
	],
	getInitialState: function () {
		return {
			page: 1,
			posts: []
		};
	},
	componentWillMount: function () {
		this.searchUnsubscribe = SearchStore.listen(this.onSearch);
		this.getNextPage();
	},
	componentDidMount: function () {
		var ele = React.findDOMNode(this).parentNode
		,   style
		;
		while (ele) {
			style = window.getComputedStyle(ele);

			if (style.overflow.length ||
				style.overflowY.length || 
				/body/i.test(ele.nodeName)
			) {
				this.scrollParent = ele;
				break;
			} else {
				ele = ele.parentNode;
			}	
		}
		this.scrollParent.addEventListener('scroll', this.onScroll);
	},
	componentWillUnmount: function () {
		this.scrollParent.removeEventListener('scroll', this.onScroll);
		this.searchUnsubscribe();
	},
	onSearch: function (search) {
		this.setState({
			page: 1,
			posts: [],
			search: search
		});
		this.getNextPage();
	},
	onScroll: function (e) {
		var scrollEle  = this.scrollParent
		,   scrollDiff = Math.abs(scrollEle.scrollHeight - (scrollEle.scrollTop + scrollEle.clientHeight))
		;

		if (!this.state.loading && !this.state.hitmax && scrollDiff < 100) {
			this.getNextPage();
		}
	},
	getNextPage: function () {
		if (this.state.loading) { return; }
		this.setState({
			loading: true
		});

		Actions.getPostsByPage(
			this.state.page, 
			Aug(this.state.search ? {q: this.state.search} : {}, this.props.params)
		).then(function (data) {
			// user may navigate away - changing state would cause a warning
			this.isMounted() && this.setState({
				loading: false,
				posts: this.state.posts.concat(data),
				hitmax: data.length === 0 || data.length < Config.pageSize,
				page: this.state.page+1
			});
		}.bind(this)); 
	},
	render: function () {
		var postsUI = this.state.posts.map(function (post) {
			return <PostView key={post.id} post={post} mode="summary"/>;
		});

		return (
			<div className="post-list">
				<ul>
					{postsUI}
				</ul>
				{this.state.hitmax ? 
					(
						<div className="total-posts-msg">
							showing { this.state.posts.length } posts
						</div>
					) : ''
				}
				{this.state.loading ? <Loader inline={true} /> : ''}
			</div>
		);
	}
});
 

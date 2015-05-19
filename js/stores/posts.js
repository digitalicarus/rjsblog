import Reflux  from 'reflux';
import Actions from 'appRoot/actions/actions';
import Request from 'superagent';
import Config  from 'appRoot/appConfig';

export default Reflux.createStore({
	listenables: Actions,
	/** Alternative Syntax 
	init: function () {
		// listen to manu
		this.listenToMany([Actions.getPosts]);
		// listen to one
		this.listenTo(Actions.getPosts, this.onGetPosts);
	},
	*/
	posts: [],
	getInitialState: function () { return this.posts; },
	/**
	 * _addPosts add posts to internal collection
	 * @param posts an array of posts
	 */
	_addPosts: function (posts, startIdx) {
		console.debug("posts store: adding posts to store", posts);
		posts.forEach(function (v,i) {
			this.posts[i+startIdx] = v;
		}.bind(this));
		this.trigger(this.posts);
	},
	//-- ACTION HANDLERS
	onGetPostsByPage: function (page = 1) {
		var start = Config.pageSize * (page-1)
		,   end   = start + Config.pageSize
		;

		Request
			.get(Config.apiRoot + '/posts')
			.query({
				'_start': Config.pageSize * (page-1),
				'_end':   Config.pageSize * (page-1) + Config.pageSize
			})
			.end(function (err, res) {
				if (res.ok) {
					this._addPosts(res.body, start);
					Actions.getPostsByPage.completed(res.body);
				} else {
					Actions.getPostsByPage.failed(err);
				}
			}.bind(this)); 
	},
	onGetPost: function (id) {
	},
	onEditPost: function (edits) {
	},
	onAddPost: function (post) {
	}
});

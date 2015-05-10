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
	/**
	 * _addPosts add posts to internal collection
	 * @param posts an array of posts
	 */
	_addPosts: function (posts, startIdx) {
		console.debug("posts store: adding posts to store", posts);
		posts.forEach(function (v,i) {
			console.log('changing', i+startIdx);
			this.posts[i+startIdx] = v;
		}.bind(this));
	},
	/**
     * _getPostsRange get a range of posts from internal collection
	 * @param   start start index (note: zero based)
	 * @param   end   end index
	 * @returns posts a slice of the internal posts
	 */
	_getPostsRange: function (start, end) {
		var posts = this.posts.slice(start, end)
		console.log("get range", posts);
		return posts.length === (end - start) ? posts : undefined;
	},
	//-- ACTION HANDLERS
	onGetPostsByPage: function (page = 1) {
		var start = Config.pageSize * (page-1)
		,   end   = start + Config.pageSize
		,   localPosts = this._getPostsRange(start, end)
		,   close = this
		;

		if (!localPosts) {
			Request
				.get('http://jsonplaceholder.typicode.com/posts')
				.query({
					'_start': Config.pageSize * (page-1),
					'_end':   Config.pageSize * (page-1) + Config.pageSize
				})
				.end(function (err, res) {
					if (res.ok) {
						close._addPosts(res.body, start);
						Actions.getPostsByPage.completed(res.body);
					} else {
						Actions.getPostsByPage.failed(err);
					}
				}); 
		} else {
			Actions.getPostsByPage.completed(localPosts);
		}
	},
	onGetPost: function (id) {
	},
	onEditPost: function (edits) {
	},
	onAddPost: function (post) {
	}
});

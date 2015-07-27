import Reflux  from 'reflux';
import Actions from 'appRoot/actions/actions';
import Request from 'superagent';
import Config  from 'appRoot/appConfig';
import Aug     from 'aug';

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
	endpoint: Config.apiRoot + '/posts',
	fieldConfigs: {
		title: {
			constraints: {
				required: true
			}
		}
	},
	//-- ACTION HANDLERS
	onGetPostsByPage: function (page = 1, params) {
		var start = Config.pageSize * (page-1)
		,   end   = start + Config.pageSize
		,   query = {
				// newest to oldest
				'_sort':  'date',
				'_order': 'DESC',
				'_start': Config.pageSize * (page-1),
				'_end':   Config.pageSize * (page-1) + Config.pageSize
			}
		;

		if (typeof params === 'object') { 
			query = Aug(query, params);
		}

		function req () {
			Request
				.get(this.endpoint)
				.query(query)
				.end(function (err, res) {
					var results = res.body;
					if (res.ok) {
						// TODO: if q param (search) filter by other params, cause it doesn't
						// problem with json-server, realistically we'd fix this on the server
						if (params.q) {
							results = results.filter(function (post) {
								return params.user ? post.user == params.user : true;
							});
						}
						Actions.getPostsByPage.completed(results);
					} else {
						Actions.getPostsByPage.failed(err);
					}
				}.bind(this)); 
		}

		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req();

	},
	onGetPost: function (id) {
		function req () {
			Request
				.get(this.endpoint)
				.query({
					id: id
				})
				.end(function (err, res) {
					if (res.ok) {
						if (res.body.length > 0) {
							Actions.getPost.completed(res.body[0]);
						} else {
							Actions.getPost.failed('Post (' + id + ') not found');
						}
					} else {
						Actions.getPost.failed(err);
					} 
				});
		}
		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req();
	},
	onModifyPost: function (post, id) {
		function req () {
			Request
				[id ? 'put' : 'post'](id ? this.endpoint+'/'+id : this.endpoint)
				.send(post)
				.end(function (err, res) {
					if (res.ok) {
						Actions.modifyPost.completed(res);
					} else {
						Actions.modifyPost.completed();
					}
				});
		}
		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req();
	}
});

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
	posts: null,
	onGetPosts: function (page = 1) {

			Request
				.get('http://jsonplaceholder.typicode.com/posts/')
				.end((err, res) => res.ok ? 
					Actions.getPosts.completed(res.body) :
					Actions.getPosts.failed(err)
				); 

	},
	onGetPost: function (id) {
	}
});

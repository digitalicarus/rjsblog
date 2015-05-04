import Reflux from 'reflux';

export default Reflux.createActions({
	'getPostsByPage': { 
		asyncResult: true, /* shortcut for completed/failed children */ 
		children:    [] // any other subactions
	},
	'getPost': function (id) {
		asyncResult: true
	},
	'editPost': function (id, edits) {
		asyncResult: true
	},
	'addPost': function (post) {
		asyncResult: true
	}
});

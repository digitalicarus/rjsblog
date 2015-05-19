import Reflux from 'reflux';

export default Reflux.createActions({
	'getPostsByPage': { 
		asyncResult: true, /* shortcut for completed/failed children */ 
		children:    [] // any other subactions
	},
	'getPost': {
		asyncResult: true
	},
	'editPost': {
		asyncResult: true
	},
	'addPost': {
		asyncResult: true
	},
	'deletePost': {
		asyncResult: true
	},
	'login': {
		asyncResult: true
	},
	'createUser': {
		asyncResult: true
	},
	'editUser': {
		asyncResult: true
	},
	'getSessionContext': {} 
});

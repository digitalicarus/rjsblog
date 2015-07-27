import Reflux from 'reflux';

export default Reflux.createActions({
	'getPostsByPage': { 
		asyncResult: true, /* shortcut for completed/failed children */ 
		children:    [] // any other subactions
	},
	'getPostsBySearch': {
		asyncResult: true
	},
	'getPost': {
		asyncResult: true
	},
	'modifyPost': {
		asyncResult: true
	},
	'deletePost': {
		asyncResult: true
	},
	'login': {
		asyncResult: true
	},
	'logOut': {},
	'createUser': {
		asyncResult: true
	},
	'editUser': {
		asyncResult: true
	},
	'search': {
	},
	'getSessionContext': {} 
});

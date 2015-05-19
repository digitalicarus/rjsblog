import Reflux  from 'reflux';
import Actions from 'appRoot/actions/actions';
import Request from 'superagent';
import Config  from 'appRoot/appConfig';

import SessionContext from 'appRoot/stores/sessionContext';

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
	users: [],
	endpoint: Config.apiRoot + '/users',
	getInitialState: function () { 
		Request
			.get(this.endpoint)
			.end(function (err, res) {
				if (res.ok) {
					this.users = res.body;
					this.trigger(this.users);
				} else {
				}
			}.bind(this)); 
	},
	modifyAndLogin: function (method, details, action) {
		Request
			[method](this.endpoint)
			.send(details)
			.end(function (err, res) {
				if (res.ok) {
					Actions.login(res.body);
					action.completed(res.body);
				} else {
					action.failed(err);
				} 
			}.bind(this));
			; 
	},
	onCreateUser: function (details) {
		this.modifyAndLogin('post', details, Actions.createUser);
	},
	onEditUser: function (details) {
		this.modifyAndLogin('put', details, Actions.editUser);
	} 
});

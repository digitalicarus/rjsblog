import Reflux  from 'reflux';
import Actions from 'appRoot/actions/actions';
import Request from 'superagent';
import Config  from 'appRoot/appConfig';
 
export default Reflux.createStore({
	listenables: Actions,
	endpoint: Config.apiRoot + '/users',
	context: { loggedIn: false },
	getInitialState: function () { return this.context; },
	getResponseResolver: function (action) {
		return function (err, res) {
			if (res.ok && res.body instanceof Array && res.body.length > 0) {
				this.context          = res.body;
				this.context.loggedIn = true;
				action.completed(this.context);
				this.trigger(this.context);
			} else {
				action.failed(err);
			} 
		}.bind(this);
	},
	onLogin: function (name, pass) {
		Request
			.get(this.endpoint)
			.query({
				'username': name,
				'password': pass
			})
			.end(this.getResponseResolver(Actions.login))
			;
	}/*,
	onCreateUser: function (details) {
		Request
			.post(this.endpoint)
			.send(details)
			.end(this.getResponseResolver(Actions.createUser))
			;
	},
	onEditUser: function (details) {
		Request
			.post(this.endpoint)
			.send(details)
			.end(this.getResponseResolver(Actions.editUser))
			;
	}*/
});

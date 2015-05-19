import React     from 'react';
import Reflux    from 'reflux';

import BasicInput   from 'appRoot/components/basicInput';
import Actions      from 'appRoot/actions/actions';
import UserStore    from 'appRoot/stores/users';
import SessionStore from 'appRoot/stores/sessionContext';

export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session'),
		Reflux.connect(UserStore, 'users')
	],
	logIn: function (e) {
		var detail = {};

		Array.prototype.forEach.call(
			e.target.querySelectorAll('input'),
			function (v) {
				detail[v.getAttribute('name')] = v.value;
			});
		e.preventDefault(); 
		e.stopPropagation(); 

		Actions.login(detail.userName, detail.password)
			.then(function () {
				console.log("SUCCESS", arguments);
			})
			['catch'](function () {
				console.log("ERROR", arguments);
			})
			;
	},
	render: function () {
		return (
			<form className="login-form" onSubmit={this.logIn}>
				<fieldset>
					<legend>Log In</legend>
					<BasicInput name="userName" type="text" placeholder="username" />
					<BasicInput name="password" type="password" placeholder="password" />
					<button type="submit">Log In</button>
				</fieldset>
			</form>
		);
	}
});


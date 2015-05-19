import React     from 'react';
import Reflux    from 'reflux';

import BasicInput   from 'appRoot/components/basicInput';
import Actions      from 'appRoot/actions/actions';
import SessionStore from 'appRoot/stores/sessionContext';

let emptyRegex = /^\s*$/;

export default React.createClass({
	mixins: [
		Reflux.connect(SessionStore, 'session')
	],
	editUser: function (e) {
		var detail = {};

		Array.prototype.forEach.call(
			e.target.querySelectorAll('input'),
			function (v) {
				if(!emptyRegex.test(v.value)) {
					detail[v.getAttribute('name')] = v.value;
				}
			});

		(this.loggedIn ? Actions.createUser : Actions.editUser)(detail);
		e.preventDefault();
	},
	componentWillUpdate: function () {
		this.loggedIn = this.state.session.hasOwnProperty('userId');
	},
	render: function () {
		var isnew = !this.loggedIn;

		return (
			<form className="user-edit" onSubmit={this.editUser}>
			<fieldset>
				<legend>{isnew ? 'become an ' : 'edit'} author</legend>

				<BasicInput type="text"  name="blogName" placeholder="blog name" autoFocus />
				<hr/>
				{ isnew && <BasicInput type="text" name="username" placeholder="username" required minLength="3" /> }
				{ isnew && <BasicInput type="password" name="password" placeholder="password" required minLength="6" /> }
				{ isnew && <br/> }

				<BasicInput type="text"  name="firstName" placeholder="first name" />
				<BasicInput type="text"  name="lastName"  placeholder="last name" />
				<BasicInput type="email" name="email"     placeholder="email" />
				<hr/>
				<BasicInput type="text"  name="twitter"  placeholder="twitter name" />
				<BasicInput type="url"   name="facebook" placeholder="facebook link" />
				
				<button type="submit">{ isnew ? "I'm ready to write" : "make changes" }</button>
			</fieldset>
			</form>
		); 
	}
});


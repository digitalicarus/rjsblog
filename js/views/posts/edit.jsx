import React     from 'react';
import Reflux    from 'reflux';
import UserStore from 'appRoot/stores/users';

export default React.createClass({
	getInitialState: function () {
		return {};
	},
	render: function () {
		return (
			<fieldset>
				<legend>{this.params.userId ? 'edit' : 'create'} author</legend>
			</fieldset>
		);
	}
});
  

import Reflux  from 'reflux';
import Actions from 'appRoot/actions';
import Router  from 'react-router';

export default Reflux.createStore({
	listenables: Actions,
	// called when mixin is used to init the component state
	getInitialState: function () { 
		return this.query;
	},
	onSearch: function (search) {
		this.query = search;
		this.trigger(search);
	}
}); 

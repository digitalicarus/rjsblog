import React     from 'react';
import Reflux    from 'reflux';
import UserStore from 'appRoot/stores/users';

import PostList  from 'appRoot/components/posts/list';
       
export default React.createClass({
	render: function () {
		// must have a root element!
		return (
			<div className="user-view">
				<PostList params={{user: this.props.params.userId}} />
			</div>
		);
	}
});
 

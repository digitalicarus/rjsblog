import React      from 'react';
import Reflux     from 'reflux';
import Router     from 'react-router';
import Moment     from 'moment';

import UserList   from 'appRoot/views/users/list';
import PostList   from 'appRoot/components/posts/list';
 
export default React.createClass({
   render: function () {
		return (
			<div className="post-list-view">
				<PostList />
				<div className="users-list">
					<UserList />
				</div>
			</div>
		);
	}
});
 

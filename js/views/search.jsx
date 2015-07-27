import React     from 'react';
import Reflux    from 'reflux';

import PostList from 'appRoot/components/posts/list';

export default React.createClass({
	render: function () {
		return (
			<div className="search-view">
				<PostList params={{q: this.props.query.query || ''}} />
			</div>
		);
	}
});
 

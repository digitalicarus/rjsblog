import React     from 'react';
import Reflux    from 'reflux';

import PostList from 'appRoot/components/posts/list';

export default React.createClass({
	propsWillUpdate: function () {
		console.log("PROPS", arguments);
	},
	willTransitionTo: function () {
		console.log("TRANSITION", arguments);
	},
	render: function () {
		console.log("RENDER SEARCH", this.props.query);
		return (
			<div className="search-view">
				<PostList params={{q: this.props.query.query || ''}} />
			</div>
		);
	}
});
 

"use strict";

import React from 'react/addons';

export default React.createClass({
	render: function () {
		// like ng-class, but for React!
		var classes = React.addons.classSet({
			'loader-container': true,
			'inline': this.props.inline
		});
		return (
			<div className={classes}>
				<aside></aside>
				<aside></aside>
				<aside></aside>
				<aside></aside>
				<aside></aside>
			</div>
		);
	}
});


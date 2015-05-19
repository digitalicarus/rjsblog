"use strict";

import React from 'react';

export default React.createClass({
	render: function () {
		return (
			<div className="basic-input">
				<input {...this.props} />
				<aside>&nbsp;</aside>
			</div>
		);
	}
});


"use strict";

import React from 'react';

let Types = React.PropTypes;

console.log(Types);

export default React.createClass({
	propTypes: {
		id:        Types.string,
		minLength: Types.string,
		pattern:   Types.instanceOf(RegExp)
	},
	render: function () {
		return (
			<div className="basic-input" {...this.props} >
				<input {...this.props} />
				<aside>&nbsp;{this.props.helptext}</aside>
			</div>
		);
	}
});


"use strict";

import React from 'react';
import ClassNames from 'classnames';

let Types = React.PropTypes;

export default React.createClass({
	// this is how you enforce property types in React
	propTypes: {
		id:        Types.string,
		minLength: Types.string,
		pattern:   Types.instanceOf(RegExp)
	},
	render: function () {
		return (
			<div className={ClassNames({'basic-input': true, 'error': this.props.error})} {...this.props} >
				<input className={this.props.error ? 'error' : ''} {...this.props} />
				<aside>{this.props.helptext || this.props.error || ' '}</aside>
			</div>
		);
	}
});

import React       from 'react';
import Router      from 'react-router';
import ClassNames  from 'classnames';

let RouteHandler  = Router.RouteHandler
,   Route         = Router.Route
,   DefaultRoute  = Router.DefaultRoute
,   Link          = Router.Link
;
 
export default React.createClass({
	componentWillMount: function () {
		console.log("ENTRY", this.props);
	},
	render: function () {
		return this.props.mode === 'summary' ? (
			<div className="entry" data-foo={'bart'} data-mode={this.props.mode}>
				<h3>
					{this.props.model.title}
					<Link to="entry" params={{entryId: this.props.model.id}}>
					</Link>
				</h3>
				<p className="postbody">
					{this.props.model.body}
				</p>
			</div>
		) : <div></div>;
	}
});
 

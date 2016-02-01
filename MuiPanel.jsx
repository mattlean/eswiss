define([
	'react'
], function(
	React
) {

	var MuiPanel = React.createClass({

		propTypes: {
			panelHead: React.PropTypes.string, // panel head
			id: React.PropTypes.string, // panel ID attribute
			className: React.PropTypes.string // panel class attribute
		},

		render: function() {
			// generate the panel head if it exists
			var panelHead = '';
			if(this.props.panelHead) {
				panelHead= <div className="panel-heading">
					<h3 className="panel-title">{this.props.panelHead}</h3>
				</div>;
			}

			// set class attribute if available
			var className = 'panel panel-default mui-panel';
			if(this.props.className) {
				className = className + ' ' + this.props.className;
			}

			return <div id={this.props.id} className={className}>
				{panelHead}
				<div className="panel-body">
					{this.props.children}
				</div>
			</div>;
		}
	});

	return MuiPanel;

}
);

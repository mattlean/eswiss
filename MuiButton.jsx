define([
	'react'
], function(
  	React
) {

	var MuiButton = React.createClass({
		render: function() {
			return <button
				id={this.props.id}
				className="mui-btn">
					{this.props.children}
				</button>;
		}
	});

	return MuiButton;

}
);

define([
	'react'
], function(
  	React
) {

	var MuiCard = React.createClass({
		render: function() {
			var cardClass = 'mui-card';
			if(this.props.className !== undefined) {
				cardClass += ' ' + this.props.className;
			}

			return <div
				id={this.props.id}
				className={cardClass}>
					{this.props.children}
				</div>;
		}
	});

	return MuiCard;

}
);

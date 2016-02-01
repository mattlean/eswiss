define([
	'react'
], function(
  	React
) {

	var MuiTableHeadRow = React.createClass({

		render: function() {
			var cols = this.props.cols.map(function(col) {
				return <th>
					{col}
				</th>;
			});

			return <tr>
				{cols}
			</tr>;
		}
	});

	return MuiTableHeadRow;

}
);

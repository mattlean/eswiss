define([
	'react'
], function(
  	React
) {

	var MuiTableRow = React.createClass({

		render: function() {
			var cols = this.props.cols.map(function(col) {
				var colSpan = '';
				var className = '';

				if(this.props.tableFixedColSize > 0 && this.props.cols.length === 1) {
					colSpan = this.props.tableFixedColSize;
					className = 'mui-empty-table-msg';
				}

				return <td colSpan={colSpan} className={className}>
					{col}
				</td>;
			}, this);

			return <tr>
				{cols}
			</tr>;
		}
	});

	return MuiTableRow;

}
);

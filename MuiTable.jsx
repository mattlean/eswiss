define([
	'react',
	'jsx!views/milesui/MuiTableHeadRow',
	'jsx!views/milesui/MuiTableRow'
], function(
	React,
	MuiTableHeadRow,
	MuiTableRow
) {

	var MuiTable = React.createClass({
		render: function() {
			var tableHead = '';
			var tableFixedColSize = 0;
			if(this.props.head) {
				tableHead = <thead>
					<MuiTableHeadRow cols={this.props.head} />
				</thead>;
				tableFixedColSize = this.props.head.length;
			}

			var table = [];
			for(var i=0; i < this.props.table.length; ++i) {
				table.push(<MuiTableRow cols={this.props.table[i]} tableFixedColSize={tableFixedColSize} />);
			}

			var tableClass = 'mui-table';
			if(this.props.className !== undefined) {
				tableClass += ' ' + this.props.className;
			}

			return <table
				id={this.props.id}
				className={tableClass}>
				{tableHead}
				<tbody>
					{table}
				</tbody>
			</table>;
		}
	});

	return MuiTable;

}
);

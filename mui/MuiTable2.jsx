define([
	'react'
], function(
	React
) {

	var MuiTable2 = React.createClass({

		propTypes: {
			tableHead: React.PropTypes.array, // table head
			tableData: React.PropTypes.array, // data displayed in table
			emptyMsg: React.PropTypes.string, // message to shown when table is empty
			id: React.PropTypes.string, // table ID attribute
			className: React.PropTypes.string // table class attribute
		},

		getDefaultProps: function() {
			return {
				tableHead: [],
				tableData: [],
				emptyMsg: 'There is currently no data to show.'
			}
		},

		shouldComponentUpdate: function(nextProps, nextState) {
			return !_.isEqual(this.props.tableData, nextProps.tableData);
		},

		render: function() {
			// generate the table body
			var rows;
			if(this.props.tableData.length > 0) {
				// table data exists, show it
				rows = this.props.tableData.map(function(row) {
					// if row key exists, assign it to the row
					var rowKey = undefined;
					if(row.key) {
						rowKey = row.key;
					}

					// if row key exists, assign keys for each cell
					var cells = [];
					for(var i=0; i < row.length; ++i) {
						var cellKey = undefined;
						if(rowKey) {
							cellKey = 'cell' + i;
						}

						cells.push(<td key={cellKey}>{row[i]}</td>);
					}

					return <tr key={rowKey}>
						{cells}
					</tr>;
				});
			} else {
				// table data doesn't exist, show emptyMsg
				var colspan = 1;
				if(this.props.tableHead.length > 0) {
					colspan = this.props.tableHead.length;
				}

				rows = <tr><td className="mui-table2-empty" colSpan={colspan}>{this.props.emptyMsg}</td></tr>
			}

			// generate the table head if it exists
			var head = '';
			if(this.props.tableHead.length > 0) {
				var headCells = [];
				for(var i=0; i < this.props.tableHead.length; ++i) {
					headCells.push(<th key={'hcell' + i}>{this.props.tableHead[i]}</th>);
				}

				head = <thead>
					<tr>{headCells}</tr>
				</thead>;
			}

			// set class attribute if available
			var className = 'table table-striped mui-table2';
			if(this.props.className) {
				className = className + ' ' + this.props.className;
			}

			return <table id={this.props.id} className={className}>
				{head}
				<tbody>
					{rows}
				</tbody>
			</table>;
		}
	});

	return MuiTable2;

}
);

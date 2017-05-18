define([
	'react',
	'jsx!views/milesui/MuiButton'
],function(
  	React,
  	MuiButton
){

	var MuiDropdown = React.createClass({
		render: function() {
			return <MuiButton>
				Options
			</MuiButton>;
		}
	});

	return MuiDropdown;

}
);

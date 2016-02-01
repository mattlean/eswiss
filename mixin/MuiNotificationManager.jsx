/* MUI ERROR MANAGER MIXIN */
define([
	'react'
], function(
  	React
) {

	var MuiNotificationManager = {
		setupNotificationManager: function(alerts, errors, warnings) {
			// notifications format:
			// [{msg: 'text', show: true}, {msg: 'text 2', show: false} ... {msg: 'text 3', show: false}]
			this.setState({
				notificationManager: {
					alerts: alerts,
					errors: errors,
					warnings: warnings
				}
			});
		},

		showAlert: function(notificationId) {
			var newAlerts = this.state.notificationManager.alerts;
			newAlerts[notificationId].show = true;

			this.setState({
				alerts: newAlerts
			});
		},

		hideAlert: function(notificationId) {
			var newAlerts = this.state.notificationManager.alerts;
			newAlerts[notificationId].show = false;

			this.setState({
				alerts: newAlerts
			});
		},

		hideAllAlerts: function() {
			var newAlerts = this.state.notificationManager.alerts;
			for(var i=0; i < newAlerts.length; ++i) {
				newAlerts[i].show = false;
			}
		}
	};

	return MuiNotificationManager;

}
);

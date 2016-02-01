/* MUI ROUTE MANAGER MIXIN */
define([
	'react',
], function(
  	React
) {

	var MuiRouteManager = {
		convertSlugToReg: function(slug) {
			var words = slug.split('_');
			var regText = '';

			for(var i=0; i < words.length; ++i) {
				regText += words[i];

				if(i < words.length - 1) {
					regText += ' ';
				}
			}

			return regText;
		},

		setupRouteManager: function(path) {
			// path format: [location @ level 1, location @ level 2 ... location @ level n]
			this.setState({
				routeManager: {
					path: path
				}
			});
		},

		goToLocation: function(level, location, cb) {
			var newPath = this.state.routeManager.path;
			var locationsToCut = 0;

			newPath[level] = location;

			for(var i=this.state.routeManager.path.length; i > level; --i) {
				++locationsToCut;
			}

			_.dropRight(newPath, locationsToCut);

			this.setState({
				routeManager: {
					path: newPath
				}
			}, function() {
				if(cb !== undefined) {
					cb(location);
				}
			});
		},

		getCurrPath: function() {
			var currPath = [];
			var prevLocations = [];

			for(var i=0; i < this.state.routeManager.path.length; ++i) {
				var path = {};
				path.location = this.state.routeManager.path[i];

				// build path link
				if(prevLocations.length === 0) {
					path.link = '/#/' + this.state.routeManager.path[i];
				} else {
					path.link = '/#/' + this.state.routeManager.path[0] + '/';
					for(var j=1; j < prevLocations.length; ++j) {
						path.link = path.link + prevLocations[j] + '/';
					}
					path.link += this.state.routeManager.path[i];
				}

				currPath.push(path);
				prevLocations.push(this.state.routeManager.path[i]);
			}

			return currPath;
		}
	};

	return MuiRouteManager;

}
);

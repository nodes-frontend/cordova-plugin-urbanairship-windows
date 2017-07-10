var cordova = require('cordova'),
	UrbanAirshipWindows = require('./UrbanAirshipWindows');

module.exports = {
	
	init: function(success, failure, uaConfig) {
		
		if (!uaConfig['key'] || !uaConfig['secret']) failure('Missing key og secret. init((success) => {}, (error) => {}, {key: YOUR_KEY, secret: YOUR_SECRET, (optional)production: false})');
		if (!uaConfig['production']) uaConfig['production'] = false;
		
		var res = RuntimeComponentTest.Class1.setUAConfig(uaConfig['key'], uaConfig['secret'], uaConfig['production']);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	setUserNotificationsEnabled: function(success, failure, enabled) {
		
		if (enabled === null) failure('Missing enabled boolean.')
		
		var res = RuntimeComponentTest.Class1.setUserNotificationsEnabled(enabled);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	setAlias: function(sucess, failure, aliasString) {
		
		if (!aliasString) failure('Missing alias. e.g. setUserNotificationsEnabled((success) => {}, (error) => {}, true, 42)');
		
		var res = RuntimeComponentTest.Class1.setApid(aliasString);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			sucess(res);
		}
	}
	
};

require("cordova/exec/proxy").add("UrbanAirshipWindows", module.exports);
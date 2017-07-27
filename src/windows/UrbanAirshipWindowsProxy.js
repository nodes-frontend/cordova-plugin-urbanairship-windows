var cordova = require('cordova'),
	UrbanAirshipWindows = require('./UrbanAirshipWindows');

function listenAndDispatch() {
	if(RuntimeComponentTest.Class1) {
		try {
			RuntimeComponentTest.Class1.addEventListener('registrationstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.registration', { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for registrationstatechanged', exception);
		}
		
		try{
			RuntimeComponentTest.Class1.addEventListener('pushstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.push',  { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}
		
		try{
			RuntimeComponentTest.Class1.addEventListener('pushparseerror', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.pusherror', { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushparseerror', exception);
		}

	}
}

module.exports = {
	
	init: function(success, failure, uaConfig) {
		listenAndDispatch();
		
		var res = RuntimeComponentTest.Class1.setUAConfig(uaConfig['key'], uaConfig['secret'], uaConfig['production']);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			var takeOffRes = RuntimeComponentTest.Class1.initUA();
			if (takeOffRes.indexOf('Error') > -1) failure(takeOffRes);
			else success(res + '\n' + takeOffRes);
		}
	},
	
	setUserNotificationsEnabled: function(success, failure, enabled) {
		
		var res = RuntimeComponentTest.Class1.setUserNotificationsEnabled(enabled);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	setAlias: function(success, failure, aliasString) {
		
		var res = RuntimeComponentTest.Class1.setApid(aliasString);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	getAlias: function(success, failure) {
		var res = RuntimeComponentTest.Class1.getAlias();
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	}
	
};

require("cordova/exec/proxy").add("UrbanAirshipWindows", module.exports);
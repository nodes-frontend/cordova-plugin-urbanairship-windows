var cordova = require('cordova'),
	UrbanAirshipWindows = require('./UrbanAirshipWindows');

function listenAndDispatch() {
	if(PushComponent.PushHandler) {
		try {
			PushComponent.PushHandler.addEventListener('registrationstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.registration', { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for registrationstatechanged', exception);
		}

		try{
			PushComponent.PushHandler.addEventListener('debugevent', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.debugevent',  { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}
		
		try{
			PushComponent.PushHandler.addEventListener('pushstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.push',  { detail: e });
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}
		
		try{
			PushComponent.PushHandler.addEventListener('pushparseerror', function(e) {
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
		
		var res = PushComponent.PushHandler.setUAConfig(uaConfig['key'], uaConfig['secret'], uaConfig['production']);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			var takeOffRes = PushComponent.PushHandler.initUA();
			if (takeOffRes.indexOf('Error') > -1) failure(takeOffRes);
			else success(res + '\n' + takeOffRes);
		}
	},
	
	setUserNotificationsEnabled: function(success, failure, enabled) {
		
		var res = PushComponent.PushHandler.setUserNotificationsEnabled(enabled);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	setAlias: function(success, failure, aliasString) {
		
		var res = PushComponent.PushHandler.setApid(aliasString);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	getAlias: function(success, failure) {
		var res = PushComponent.PushHandler.getAlias();
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	}
	
};

require("cordova/exec/proxy").add("UrbanAirshipWindows", module.exports);
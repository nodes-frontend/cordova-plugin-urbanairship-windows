var cordova = require('cordova'),
	UrbanAirshipWindows = require('./UrbanAirshipWindows');

function listenAndDispatch() {
	if(PushComponent.PushHandler) {
		try {
			PushComponent.PushHandler.addEventListener('registrationstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.registration', e);
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for registrationstatechanged', exception);
		}

		try{
			PushComponent.PushHandler.addEventListener('debugevent', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.debugevent',  e);
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}
		
		try{
			PushComponent.PushHandler.addEventListener('pushstatechanged', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.push',  e);
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}

		try{
			PushComponent.PushHandler.addEventListener('pushactivated', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.notification_opened',   e);
				document.dispatchEvent(event);
			});
		} catch(exception) {
			console.error('UrbanAirshipWindows could not add Event Listener for pushstatechanged', exception);
		}
		
		try{
			PushComponent.PushHandler.addEventListener('pushparseerror', function(e) {
				console.info('UrbanAirshipWindows will dispatch Event: ', e);
				var event = new CustomEvent('urbanairship.pusherror', e);
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
	
	setUserNotificationsEnabled: function(success, failure, enabled, interceptNotifications) {
		
		var res = PushComponent.PushHandler.setUserNotificationsEnabled(enabled, interceptNotifications);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	setAlias: function(success, failure, aliasString) {
		
		var res = PushComponent.PushHandler.setAlias(aliasString);
		
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
	},

	setTags: function(success, failure, tags) {
		
		var res = PushComponent.PushHandler.setTags(tags);
		
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	},
	
	getTags: function(success, failure) {
		var res = PushComponent.PushHandler.getTags();
		console.log('PushHandler.getTags() -> ' + res);
		if (res.indexOf('Error') > -1) {
			failure(res);
		} else {
			success(res);
		}
	}
	
};

require("cordova/exec/proxy").add("UrbanAirshipWindows", module.exports);
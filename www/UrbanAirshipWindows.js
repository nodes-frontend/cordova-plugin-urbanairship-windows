var cordova = require("cordova"),
	exec = require("cordova/exec");

function callNative(success, failure, name, args) {
	args = args || [];
	exec(success, failure, "UrbanAirshipWindows", name, args)
}

module.exports = {
	/**
	 * Initializes the SDK
	 * @param {string} uaConfig path string to the xml containing UrbanAirship config
	 * @param {function} [success] Success callback.
	 * @param {function(message)} [failure] Failure callback.
	 * @param {string} failure.message The error message.
	 */
	init: function(uaConfig, success, failure) {
		if (!uaConfig ||!uaConfig['key'] || !uaConfig['secret']) failure('Missing config, key or secret. init({key: YOUR_KEY, secret: YOUR_SECRET, production(optional): false}, sucessCallback, errorCallback)');
		
		console.info('UrbanAirshipWindows will use config: '+uaConfig);
		callNative(success, failure, "init", uaConfig);
	},
	
	/**
	 * Enables or disables user notifications.
	 * @param {boolean} enabled true to enable notifications, false to disable.
	 * @param {function} [success] Success callback.
	 * @param {function(message)} [failure] Failure callback.
	 * @param {string} failure.message The error message.
	 */
	setUserNotificationsEnabled: function(enabled, success, failure) {
		if (enabled === null) failure('You must specify enabled boolean.');
		
		console.info('UrbanAirshipWindows will set user notifications enabled: '+enabled);
		callNative(success, failure, "setUserNotificationsEnabled", enabled);
	},
	
	/**
	 * Sets Alias for this apid
	 * @param {string} aliasString (can be null in which case UrbanAirshipWindows will clear alias)
	 * @param {function} [success] Success callback.
	 * @param {function(message)} [failure] Failure callback.
	 */
	setAlias: function(aliasString, success, failure) {
		if (aliasString === null) {
			console.log('UrbanAirshipWindows will clear alias.');
			aliasString = '';
		} else {
			console.log('UrbanAirshipWindows will set alias: ' + aliasString);
		}
		callNative(success, failure, "setAlias", aliasString);
	}
};
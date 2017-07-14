var cordova = require("cordova"),
	exec = require("cordova/exec");

function callNative(success, failure, name, args) {
	args = args || [];
	exec(success, failure, "UrbanAirshipWindows", name, args)
}

function bindDocumentEvent() {
	callNative(function(e) {
		console.log("Firing document event: " + e.eventType);
		cordova.fireDocumentEvent(e.eventType, e.eventData);
	}, null, "registerListener");
}

module.exports = {
	/**
	 * Event fired when a new deep link is received.
	 *
	 * @event "urbanairship.deep_link"
	 * @type {object}
	 * @param {string} [deepLink] The deep link.
	 */
	
	/**
	 * Event fired when a channel registration occurs.
	 *
	 * @event "urbanairship.registration"
	 * @type {object}
	 * @param {string} [channelID] The channel ID.
	 * @param {string} [error] Error message if an error occurred.
	 */
	
	/**
	 * Event fired when the inbox is updated.
	 *
	 * @event "urbanairship.inbox_updated"
	 */
	
	/**
	 * Event fired when a push is received.
	 *
	 * @event "urbanairship.push"
	 * @type {object}
	 * @param {string} message The push alert message.
	 * @param {object} extras Any push extras.
	 * @param {number} [notification_id] The Android notification ID.
	 */
	
	/**
	 * Event fired when notification opened.
	 *
	 * @event "urbanairship.notification_opened"
	 * @type {object}
	 * @param {string} message The push alert message.
	 * @param {object} extras Any push extras.
	 * @param {number} [notification_id] The Android notification ID.
	 */
	
	/**
	 * Re-attaches document event listeners in this webview
	 */
	reattach: bindDocumentEvent,
	
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
		if (enabled === undefined || enabled === null) failure('You must specify enabled boolean.');
		
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
	},
	
	getAlias: function(success, failure) {
		callNative(success, failure, "getAlias");
	}
};
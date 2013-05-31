/*jslint vars: true, white: true*/
(function () {
	"use strict";
	
	// requires
	var EventManager = require('./utEE2Plus');

	// app object: Unique, do not instantiate with Object.create, methods won't work well.
	var app = {};
	app.log = function () {
	
		if (app.debug) {
			var logArgs = arguments;
			logArgs[0] = '[DEBUG] ' + logArgs[0];   
			console.log.apply(app, logArgs);      // if you use call and jus add another '[DEBUG]' in front, things like %j stop working
		}
	};	

	app.evt = new EventManager( {wildcards: true, delimiter: '.', newListener : true} ); 
	
	app.evt.debugLogger = function () {
		app.log.apply(app, arguments);
	};
	
	app.evt.debug = function () {  // link app.evt.debug to app.debug
		return app.debug;
	};
	//app.evt.debugPrefix = "app.evt: ";

	app.start = function () {
		app.evt.emit('start.done');  // warning: using . delimiter
	};

	app.end = function () {
		process.exit(0);
	};

	app.db = {
			config : null,
			driver : null,
			conn : null
	};
	
	app.debug = false;

	//export
	module.exports = app;
})();



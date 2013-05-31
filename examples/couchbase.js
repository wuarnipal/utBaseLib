/*jslint white:true, vars: true */
//"use strict";

// Requires
var app = require('../');
app.fs = require('fs');
app.db.driver = require('couchbase');

// App config and extensions
app.db.configFile = '../../couchbase2/couchbaseConfig.json';
app.debug = true;				// allows app.log to work

// FUNCTION DEFINITIONS
app.getDBConfig = function () {
  app.fs.readFile(app.db.configFile, 'UTF8', function(err, fileData) {
		if (err) return app.evt.emit('getDBConfig.error',err);
		
		fileData = JSON.parse(fileData);  // convert string to object
		app.db.config = fileData;
		app.evt.emit('getDBConfig.done');
	});
};

app.getDBConnection = function () {
	//app.log('getDBConnection1');
	app.db.driver.connect( 
		app.db.config, 
		function (err, bucket) {
			if (err) {
				app.evt.emit('getDBConnection.error',err);
				return;
			}
			app.db.conn = bucket;
			app.evt.emit('getDBConnection.done');
		}
	);
};

app.runTest1 = function () {
	// db conn ok
	var key = 'foo';
	var bucket = app.db.conn;
	bucket.set( 
		key, 
		'{"server" : "couchbase", "version" : 2 }', 
		function (err, meta) {
			if (err) { 
				app.evt.emit('runTest1.error','inserting');
			}

			bucket.get(key, function(err, doc) {
				if (err){ 
					app.evt.emit('runTest1.error','getting');
				}
				console.log('bucket.get: %j',doc);   //not a debug log
				app.evt.emit('runTest1.done');
			});  
		}	
	);
	
}


// ************************************
// MAIN
// ************************************

app.main = function () {

	// Error flow
	app.evt.on("*.error", function (arg) {
		app.log('Fatal ERROR: ', arg);
		process.exit(1);
	});

	// Normal flow
	// remember: the fn in 2nd arg is called with this=app.evt. If you dont want this use "function() {app.fn()}" instead
	app.evt.on('start.done', app.getDBConfig);
	app.evt.on('getDBConfig.done', app.getDBConnection);
	app.evt.on("getDBConnection.done", app.runTest1);
	app.evt.on("runTest1.done", app.end);

	// Fire first event 
	app.start();  // normal start
};


// ********************************
// START
// ********************************
if (typeof MOCHA_TEST === 'undefined') {
	app.main();  // normal start
}

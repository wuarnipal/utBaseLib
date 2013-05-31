//"use strict";   // not using it, as we want eval in global mode
var assert = require('assert');
var fs = require('fs');

// as we're testing a non-module, we cant use require
var scriptContent = fs.readFileSync ('../examples/couchbase.js', 'UTF8');
var MOCHA_TEST = true;		// avoids program to start, just make definitions
/*var app = */eval(scriptContent);   // "use strict;" disabled, global mode


// Now, the tests
describe('app.getDBConfig', function() {
	
	it('should load app.db.config with the content of app.db.configFile file', function(done) {
		app.debug = false;
		app.evt.on('getDBConfig.done', function() { 
			assert.equal( app.db.config.hosts[0], 'localhost:8091');
			done();
		});
		app.getDBConfig();
	});
	
});
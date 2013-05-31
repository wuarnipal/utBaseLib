"use strict";
var assert = require('assert');
var fs = require('fs');
var scriptContent = fs.readFileSync ('../examples/couchbase.js');
//eval(scriptContent);
console.log(scriptContent);
/*
describe('app.start', function() {
	
	it('should emit "app.start.done" on app.evt', function(done) {
		app.debug = false;
		app.evt.on('app.start.done', function() { done() });
		app.start();
	});
	
});

*/


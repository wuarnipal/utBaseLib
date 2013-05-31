"use strict";
var assert = require('assert');
var app = require('../lib/utBaseApp.js');
//WARNING: app is unique (global) object, ensure every test leaves its states as it entered

// Tests
describe('app.log', function() {
	
	it('should write a log through console.log when app.debug', function () {
		var old_console_log = console.log;
		var log_result = '';
		app.debug = true;  
		console.log = function (arg) {		// hook console.log
			log_result = arg;
		};
		app.log('test');									// try it
		console.log = old_console_log;		//unhook console.log
		
		//console.log('<' + log_result + '>');
		app.debug = false;
		assert.equal(log_result, '[DEBUG] test');
	});

});


describe('app.start', function() {
	
	it('should emit "start.done" on app.evt', function(done) {
		app.debug = false;
		app.evt.on('start.done', function() { done() });
		app.start();
	});
	
});




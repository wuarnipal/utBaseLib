"use strict";
var assert = require('assert')
	, EE2plus = require('../lib/utEE2plus.js');

// Tests
describe('emit', function() {
	it('should write a log in debug mode', function (done) {
		var evt = new EE2plus();
		evt.debug = true;
		evt.debugLogger = function () { done(); };
		evt.emit('TESTING emit1');
	});
	
	it('should be heared by corresponding "on"', function(done) {
		var evt = new EE2plus();
		evt.on('test-event', done);
		evt.emit('test-event');
	});
	
	it('should be heared by wildcarded "on"', function(done) {
		var evt = new EE2plus( {delimiter: '.', wildcard: true} );
		evt.on('*.event', done);
		evt.emit('test.event');
	});
});

describe('on', function() {
	it('should emit "newListener" and be logged by the latter in debug mode"', function (done) {
		var evt = new EE2plus( /*{newListener: true}*/ );
		evt.debug = true;
		evt.debugLogger = function () { done(); };
		evt.on('TESTING emit1', function () {});
	});

	it('should not emit "newListener" if option disabled', function (done) {
		var evt = new EE2plus( {newListener: false} );
		evt.debug = true;
		evt.debugLogger = function () { throw 'error'; };
		evt.on('TESTING emit1', function() {} );
		//setTimeout(done,50);
		process.nextTick(done);
	});	
	
});

describe('callAsEmitter', function() {

	it('should call the async function and emit function-name.done on success', function(done) {
		var asyncFn = function(errResult, cb) {
			setTimeout( function() {
				cb(errResult, 'data');
			}, 10);
		};

		var evt = new EE2plus();
		evt.on('asyncFn.done', function() { done(); });
		//evt.debug=true;
		//evt.newListener=true;
		evt.callAsEmitter('asyncFn', asyncFn, null);
	});
	
	it('should call the function and emit function-name.error on erro', function(done){
		var asyncFn = function(errResult, cb) {
			setTimeout( function() {
				cb(errResult, 'data');
			}, 10);
		};

		var evt = new EE2plus();
		evt.on('asyncFn.error', function() { done(); });
		//evt.debug=true;
		//evt.newListener=true;
		evt.callAsEmitter('asyncFn', asyncFn, true);
	});
});

describe('cae', function() {
	it('should be the same as callAsEmitter', function() {
		var evt = new EE2plus();
		assert.equal(evt.cae, evt.callAsEmitter);
	});
});



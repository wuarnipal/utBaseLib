/**
* Kind of Mocha simulator.
* Simulates Mocha's environmente to debug "it" code alone
* (c)DavidRSouto, 2013 
* utsaina@gmail.com
* suscribed by wuarnipal
* License: MIT
**/

// Some helper functions
var done = function () {
	console.log("[DONE]:", arguments[0] || '');
}

// simulate mocha timeout
setTimeout(function () {
	console.log('EXIT: global timeout');
	process.exit(0);
	}, 1000
);


// **********************************************
// TEST CODE HERE
// **********************************************

// requires and initializations
var assert = require('assert')
	, util = require('util');
//var Evt = require('../lib/utEE2plus.js');
var Evt = require('../node_modules/eventemitter2/lib/eventemitter2.js').EventEmitter2;

//some 'it' code here
var evt = new Evt ({ newListener : false  });
//evt.debug = true;


evt.on('newListener', function () {
	console.log('[nonMocha]','evt.on: newListener');
});


console.log('[nonMocha] evt.on.dalle');
evt.on('dalle', function () {
	console.log('[nonMocha] dalle capturado');
});
evt.emit('dalle');


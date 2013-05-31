(function () {
	"use strict";
	var util = require('util');
	var EE2 = require('eventemitter2').EventEmitter2;
 
	var delimiter = '.';   // alternate :: or # may be good choices, to forces sintax error in case of forgetin to enclose the event name in quotes

	/**	
	*	Constructor
	**/
	var EventManager = function (config) {
		if (config) {
			if (config.delimiter) {
				// has config.delimiter, update ours
				delimiter = config.delimiter;
			} else {
				// has config, but no config.delimiter -> insert ours
				config.delimiter = delimiter;
			}
		} else {
			// no config -> standard config
			config = {
				delimiter: delimiter, 
				wildcard: true,
				newListener: true
			};
		}
				
		// initialize parent (EventEmitter2) constructor
		EE2.call(this, config );   //i.e.: arguments.callee.super_.call(this,config);
	};
	
	/**
	* Inherit
	**/
	util.inherits(EventManager, EE2);

	/**	
	*	Prototype Emit: extending EE2 function
	**/
	EventManager.prototype.emit = function () {
		/**/console.log('[ee2plus] emit: ', arguments[0]);
		// log it?
		if ((this.debug && arguments[0] !== 'newListener') ||
				(this.debug && arguments[0] === 'newListener' && this.newListener === true)
			)	{
			// oddly, EE2 sends this.emit from this.on even if this.newListener is true
			// so we have to check it here as well

			// log it
			var logger = this.debugLogger || console.log;
			var prefix = this.debugPrefix || '[EVENT] ';
			logger(prefix, arguments[0], arguments[1] ? arguments[1] : '' );
		}

		// call parent's emit
		EE2.prototype.emit.apply(this,arguments);
	};
	
	
	/** 
	* Prototype callAsEmitter or cae
	* Helper to easily convert a standar async function with callback, in an event emiiter function
	* calling the funciton with a custom callback emits .done or .error
	**/
	EventManager.prototype.callAsEmitter = EventManager.prototype.cae = function () {
		"use strict";
		var that = this;
		var argsArray = Array.prototype.slice.call(arguments);   // object > array
		var fnName = argsArray.shift();
		var fn = argsArray.shift();
		
		// our custom callback
		var callback = function (err,data) {
			if (err) return that.emit(fnName + delimiter + "error", err, data);
			that.emit(fnName + delimiter + "done", data);
		};

		argsArray.push(callback); // our callback
		fn.apply(this, argsArray);
		
		return this;  // sintax sugar, if you wanna chain the .on
	};

	
	/** 
	* Deprecated: Dont use, brainstorming func.
	* Prototype to pass data from previous event to next action
	**/
	EventManager.prototype.continueAsEmitter = function (fn) {
		return function (data) {
				//console.log("continueAsEmitter");
				this.callAsEmitter(fn,data);
		};
	};

	
	// -------------------
	// EXPORTS	
	// -------------------
	module.exports = EventManager;
	
	
})();
var timeout = 10;

var EventManager = require('../utBaseLib').EventManager;

// -----------MAIN
var evt = new EventManager();

evt.on( "readConfig.done" , evt.continueAsEmitter( connectDB ));
evt.on( "connectDB.done" , evt.continueAsEmitter( findInDB ))
evt.on( "findInDB.done" , function (data) { 
		console.log("final: " + data); 
	});

evt.on("*.error", function (err, data) {
	console.log("ERROR: ", this.event, err,data);
});

evt.callAsEmitter( readConfig,"fich" );

















// ------------------------- function definitions
function readConfig(data, cb) {
	console.log("readConfig...");
	setTimeout( function() {
		console.log("...done");
		cb(null, data +"_content");
	}, timeout);
}

function connectDB(data, cb) {
	console.log("connectDB...");
	setTimeout( function() {
		console.log("...done");
		cb(-1, data +"_connection");
	}, timeout);
}

function findInDB(data, cb) {
	console.log("findInDB...");
	setTimeout( function() {
		console.log("...done");
		cb(null, data +"_document");
	}, timeout);
}

function startHttp(thePort, handler) {
	for (var i =1; i<=3; i++) {
		setTimeout(handler("req" + i,"res"+i), timeout+i*100);
	}
}

function sendHttpResponse(value, res) {
	// final result
	console.log("Sending " + value + " to " + res);
}


/*
*/
function httpHandler(req, res, cb) {
	findInDB("req.Id", function (idValue) {
		sendHttpResponse(idValue, res)
	});   //findInDB is passin IdValue to sendRespons, but I also need to pass "res"

	
}



// ----------------------------------

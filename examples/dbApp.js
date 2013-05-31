/*jslint vars: true, white: true*/
"use strict";
// requires
var app = require('../').app;

var timeout = 10;
	
// Main Flow
app.on("app.start.done", function () {	
	app.cae( readConfig, "fichero");
});
app.on("readConfig.done" , function (dbConfig) {
	app.cae( connectDB, dbConfig );
});
app.on("connectDB.done" , function(dbConn) {
	app.cae( findInDB, dbConn, "id1" );
});
app.on( "findInDB.done" , function (data) { 
		console.log("final: " + data); 
});

// Error catch
app.on("*.error", function (err, data) {
	console.log("ERROR: ", this.event, err,data);
});

// Start events
app.start();





// ------------------------- function definitions

// fake db connection functions
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
		cb(null, data +"_connection");
	}, timeout);
}

function findInDB(dbConn, id, cb) {
	console.log("findInDB...");
	setTimeout( function() {
		console.log("...done");
		cb(null, id +"_document");
	}, timeout);
}


// --- fake http server functions
function startHttp(thePort, handler) {
	var i; //looper
	for (i=1; i<=3; i+=1) {
		setTimeout(handler("req" + i,"res"+i), timeout+i*100);
	}
	console.log("i es: " + i);
}

function sendHttpResponse(value, res) {
	// final result
	console.log("Sending " + value + " to " + res);
}

function httpHandler(req, res, cb) {
	findInDB("req.Id", function (idValue) {
		sendHttpResponse(idValue, res);
	});	 //findInDB is passin IdValue to sendRespons, but I also need to pass "res"
}



// ----------------------------------

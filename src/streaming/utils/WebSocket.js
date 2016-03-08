
// ADD

MediaPlayer.utils.WebSocket = function () {
	"use strict";
	
	var websocket,
		connected,
		id,
		bandwidth = 500000; //in bps, default 500000

	return {
		log: undefined,

		connect: function () {
			var self = this;
			websocket = new WebSocket('ws://router:9000', 'my-protocol');

			websocket.onopen = function () {
			self.log("WEBSOCKET INIT, " + JSON.stringify(websocket));
				connected = true;
			};

			websocket.onerror = function () {
				self.log("ERROR OCCUR");
			};

			websocket.onmessage = function(event) {
				if (event.data.length === 0) return;
				if (event.data[0] === 'B') {
					bandwidth = Number(event.data.substr(1));
				} else {
					self.log("========== Assigned ID: " + event.data + " ==========");
					id = event.data; // server replies back id
				}
			};
		},

		send: function(content) {
			if (connected !== true || content === null) return;
			websocket.send(content);
		},

		info: function(content) {
			// log estimated bandwidth
			var d = new Date();
			var n = d.getTime() / 1000;
			console.info(content + " " + n);
		},

		warn: function(content) {
			// log video bitrate
			var d = new Date();
			var n = d.getTime() / 1000;
			console.warn(content + " " + n);
		},

		error: function(content) {
			// log audio bitrate
			var d = new Date();
			var n = d.getTime() / 1000;
			console.error(content + " " + n);
		},

		print: function(content) {
			this.log(content);
		},

		close: function() {
			websocket.close();
		},

		getId: function() {
			return id;
		},

		getBandwidth: function() {
			return bandwidth - 320000; //consider the audio bitrate
		}
	};
};

MediaPlayer.utils.WebSocket.prototype = {
    constructor: MediaPlayer.utils.WebSocket
};
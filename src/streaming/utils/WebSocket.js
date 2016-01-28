
// ADD

MediaPlayer.utils.WebSocket = function () {
	"use strict";
	
	var websocket,
		connected;

	return {
		log: undefined,

		connect: function () {
			var self = this;
			websocket = new WebSocket('ws://router:9000', 'my-protocol');
			self.log("INITIATING WEBSOCKET!!!");

			websocket.onopen = function () {
				self.log("WEBSOCKET INIT");
				connected = true;
			};

			websocket.onerror = function () {
				self.log("ERROR OCCUR");
			};

			websocket.onmessage = function(event) {
				self.log("========== Server: " + event.data + " ==========");
			};
		},

		send: function(content) {
			if (connected !== true) return;
			websocket.send(content);
		},

		close: function() {
			websocket.close();
		}
	};
};

MediaPlayer.utils.WebSocket.prototype = {
    constructor: MediaPlayer.utils.WebSocket
};
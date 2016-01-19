
// ADD

MediaPlayer.utils.WebSocket = function () {
	"use strict";
	
	var websocket,
		connected;

	return {
		log: undefined,

		connect: function () {
			var self = this;
			websocket = new WebSocket('ws://192.168.0.23:9000', 'my-protocol');
			self.log("INITIATING WEBSOCKET!!!");

			websocket.onopen = function () {
				self.log("WEBSOCKET INIT");
                connected = true;
            };

			websocket.onerror = function () {
                self.log("ERROR OCCUR");
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
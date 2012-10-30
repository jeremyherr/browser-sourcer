var socketManager = io.connect('http://localhost:3000');
var socketData    = io.connect('http://localhost:3001');
var sessionInfo;
var state = '';

socketManager.on('connectionInfo', function (data) {
	document.getElementById('connection').innerHTML = 'connection ID: ' + data.id;
	sessionInfo = data;
});

socketManager.on('news', function (data) {
	console.log(data);
	socketManager.emit('my other event', { my: 'data' });
});

document.getElementById('sessionCounter').onclick = function (data) {
	console.log(data);
	socketManager.emit('press button', { from: 'me' });
};

socketManager.on('button tally', function (data) {
	console.log(data);
	document.getElementById('sessionCounter').innerHTML = 'count: ' + data.num;
});

/**
 * When user clicks button, send request to data server for data.
 *
 */

document.getElementById('requestData').onclick = function () {
	var data = { };
	socketData.emit('request data', data);
	state = 'waitForData';
};

socketData.on('data', function(data) {
	if (state === 'waitForData') {
		console.log('received data:');
		console.log(data);
	} else {
		console.log('server sending us data that we did not request');
	}
});

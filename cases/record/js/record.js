let stream = null,mediaRecorder = null,chunks = [], media = null;
async function createMedia (type, option) {  
	try {
		stream = await navigator.mediaDevices.getUserMedia(option);
		media = document.querySelector(type);
		if (type === 'video') {
			media.srcObject = stream;
		}
		console.log(type, stream);

		let options = {
			audioBitsPerSecond : 128000,
			videoBitsPerSecond : 2500000,
		}
		mediaRecorder = new MediaRecorder(stream, options);
		console.log(type, mediaRecorder);

		mediaRecorder.ondataavailable = function (e) {  
			chunks.push(e.data);
		}

		mediaRecorder.start();

		mediaRecorder.onstop = function () {
			let blob = new Blob(chunks, {'type': mediaRecorder.mimeType});
			let url = window.URL.createObjectURL(blob);
			if (type === 'video') {
				media.srcObject = null;
			}
			media.src = url;
			stopSet(type);
		}

	} catch (error) {
		console.log('getUserMedia： ', error);
	}
}

function start (type) {
	let option = type == 'audio' ? {
		audio: true
	} : {
		video: true,
	}
	createMedia(type, option);
}

function stop (type) {
	mediaRecorder.stop();
}

function stopSet (type) {  
	if (type == 'audio') {
		stream.getAudioTracks()[0].stop();
		stream = null;
	} else {
		stream.getVideoTracks()[0].stop();
	}
	stream = null;
	mediaRecorder = null;
	chunks = [];
	meida = null;
}
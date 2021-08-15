/*
 * @Author: fegq
 * @Description: This is a header comment.
 * @version: v0.0.1
 * @Date: 2021-08-10 09:35:39
 * @LastEditors: fegq
 * @LastEditTime: 2021-08-15 14:45:32
 */
// 开启关闭媒体设备兼容
const mediaUtils = {
	/**
	 * 获取用户媒体设备（处理兼容）
	 * @param videoEnable {boolean} 是否启用摄像头
	 * @param audioEnable {boolean} 是否启用麦克风
	 * @param callback {function} 处理回调
	 */
	getUserMedia: function (videoEnable, audioEnable, callback) {  
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.getUserMedia;
		var constraints = {video: videoEnable, audio: audioEnable};
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {  
				callback(false, stream);
			})['catch'](function (err) {  
				callback(err);
			})
		} else if (navigator.getUserMedia) {
			navigator.getUserMedia(constraints, function (stream) {  
				callback(false, stream);
			}, function (err) {  
				callback(err);
			});
		} else {
			callback(new Error('Not Support userMedia!'));
		}
	},

	/**
	 * 关闭媒体流
	 * @param stream {mediastream} 需要关闭的流
	*/

	closeStream: function (stream) {  
		if (typeof stream.stop === 'function') {
			stream.stop();
		} else {
			let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];
			for (let i = 0; i < trackList.length; i++) {
				let tracks = trackList[i];
				if (tracks && tracks.length > 0) {
					for (let j = 0; j < tracks.length; j++) {
						let track = tracks[j];
						if (typeof tracks.stop === 'function') {
							track.stop();
						}
					}
				}
			}
		}
	}
}

// 录制、停止、播放视频方法

// 存放MediaRecorder对象和音频track
let recorder,mediaStream;
// 存放录制的音频文件和回调
let recorderFile,stopRecordCallback;
// 存放是否开启视频录制
let videoEnabled = false;

// 录制短语音
function startRecord (enableVideo) {  
	videoEnabled = enableVideo;
	mediaUtils.getUserMedia(enableVideo, true, function (err, stream) {  
		if (err) {
			throw err;
		} else {
			// MediaRecorder 媒体流
			recorder = new MediaRecorder(stream);
			mediaStream = stream;
			var chunks = [], startTime = 0;
			recorder.ondataavailable = function (e) {  
				chunks.push(e.data);
			}
			recorder.onstop = function (e) {  
				recorderFile = new Blob(chunks, {'type': recorder.mimeType});
				chunks = [];
				if (null != stopRecordCallback) {
					stopRecordCallback();
				}
			};
			recorder.start();
		}
	});
}

// 停止录制
function stopRecord (callback) {  
	stopRecordCallback = callback;
	recorder.stop();
	mediaUtils.closeStream(mediaStream);
}

// 播放音频录制
function playRecord () {  
	var url = URL.createObjectURL(recorderFile);
	var dom = document.createElement(videoEnabled ? 'video' : 'audio');
	dom.autoplay = true;
	dom.src = url;
	var record = document.querySelector('#record');
	if (videoEnabled) {
		dom.style.position = 'relative';
		dom.style.margin = '0 auto';
		dom.width = 320;
		dom.height = 200;
		dom.setAttribute('controls', 'controls');
		record.appendChild(dom);
	}
}

// 启动播放录制

// true 视频 false 音频
// startRecord(false);
// // 5秒后停止录制
// setTimeout(() => {
// 	stopRecord(function () {  
// 		playRecord();
// 	});
// }, 5000);

console.log('录制数据：', recorderFile);

// var data = new FormData();

// data.append('name', 'test');
// data.append('file', recorderFile);

// var req = new XMLHttpRequest();
// req.open('post', 'xxx');
// req.send(data);

// ==UserScript==
// @name         Video control
// @version      0.1
// @description  Control speed with numbers and jump over video with arrows
// @author       4cd87a
// @match        http://*/*.mp4
// @match        https://*/*.mp4
// @grant        none
// ==/UserScript==

console.log('Video control script');

function keyfunc(e) {
	// console.log(e.keyCode)
	if (e.keyCode==37) {
		document.getElementsByTagName("video")[0].currentTime -=10};
	if (e.keyCode==39) {
		document.getElementsByTagName("video")[0].currentTime +=10};
	if (e.keyCode>=48 && e.keyCode<=57) {

		// 9->2.5
		// 8->2
		// 7->1.75
		// 6->1.5
		// 5->1.15
		// 4->1
		// 3->0.75
		// 2->0.5
		// 1->0.25
		// 0->1

		var playbackRate=0.25*(e.keyCode-48);
		if (playbackRate==0) playbackRate=1;
		if (playbackRate==2.25) playbackRate=2.5;
		console.log("speed = ", playbackRate)
		for(var i=0;i<document.getElementsByTagName("video").length;i++) {
			document.getElementsByTagName("video")[i].playbackRate = playbackRate;
		}

	}
};

document.addEventListener("keydown", keyfunc);
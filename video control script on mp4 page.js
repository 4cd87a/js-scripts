// ==UserScript==
// @name         Video control on mp4 pages
// @version      0.1
// @description  Control speed with numbers and jump over video with arrows
// @author       4cd87a
// @match        http://*/*.mp4
// @match        https://*/*.mp4
// @match        https://*.zoom.us/*
// @match        https://filesicfp.phys.ens.fr/*


// @grant        none
// ==/UserScript==

console.log('Video control script');

var currentvideo = 0;

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

function keyfunc(e) {
	//console.log(e.keyCode)
	if (e.keyCode==37) {
        console.log("step +10s");
		document.getElementsByTagName("video")[currentvideo].currentTime -=10};
	if (e.keyCode==39) {
        console.log("step -10s");
		document.getElementsByTagName("video")[currentvideo].currentTime +=10};

    if (e.keyCode==32) {
		if (document.getElementsByTagName("video")[currentvideo].playing) {
            console.log("pause");
            document.getElementsByTagName("video")[currentvideo].pause();
        } else {
            console.log("play");
            document.getElementsByTagName("video")[currentvideo].play();
        };
        e.stopPropagation();
        e.preventDefault();
    }

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
	if (e.keyCode==70) {
        console.log("Enter/exit fullscreen");
		var fullscreenstate = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		fschange(document.getElementsByTagName("video")[currentvideo], (fullscreenstate+1)%2)
	}
};


function fschange(element, i) {
	if (i==0) {
		document.exitFullscreen()
	} else {
		element.requestFullscreen()
	}

}

document.addEventListener("keydown", keyfunc);
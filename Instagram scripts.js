// ==UserScript==
// @name         Instagram scripts
// @version      0.2
// @description  Control speed with numbers and jump over video with arrows
// @author       4cd87a
// @match        https://instagram.com/*
// @match        https://*.instagram.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        none
// ==/UserScript==

console.log('Instagram scripts');

var currentvideo = 0;
var step = 2.5;
var src = "";
var playbackRate = 1.5; // speed of stories by default

function keyfuncInst(e) {
	//console.log(e.keyCode)

	if (e.keyCode==66) { // b => step back for some seconds
		//step = document.getElementsByTagName("video")[0].duration/5;
		document.getElementsByTagName("video")[0].currentTime -=step};

	if (e.keyCode==78) { // n => step for some seconds
		//step = document.getElementsByTagName("video")[0].duration/5;
		document.getElementsByTagName("video")[0].currentTime +=step};


	if (e.keyCode==68) { //d
		if (window.jQuery("article[role='presentation'] div[class^='_']").get(0)) {
            src = window.jQuery(window.jQuery("article[role='presentation'] div[class^='_']").get(0)).find('img').get(0).src;
			openInNewTab(src);
		} else {
            if (document.getElementsByTagName("video")[0]) {
                src = document.getElementsByTagName("video")[0].getElementsByTagName('source')[0].src;
                if (src) openInNewTab(src);
            }
		};
	}

	if (e.keyCode==77) { //m
		if (window.jQuery("button[label='Toggle audio']"))
			window.jQuery("button[label='Toggle audio']").get(0).parentNode.click();
	}


	if (e.keyCode>=48 && e.keyCode<=57) { // 0->9

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

		playbackRate=0.25*(e.keyCode-48);
		if (playbackRate==0) playbackRate=1;
		if (playbackRate==2.25) playbackRate=2.5;
		console.log("speed = ", playbackRate)
		for(var i=0;i<document.getElementsByTagName("video").length;i++) {
			document.getElementsByTagName("video")[i].playbackRate = playbackRate;
		}

	}

	if (e.keyCode==70) {
		var fullscreenstate = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		fschange(document.getElementsByTagName("video")[currentvideo], (fullscreenstate+1)%2)
	}

};

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function fschange(element, i) {
	if (i==0) {
		document.exitFullscreen()
	} else {
		element.requestFullscreen()
	}

}

function onchangeInst() {
	for(var i=0;i<document.getElementsByTagName("video").length;i++) {
		document.getElementsByTagName("video")[i].playbackRate = playbackRate;
	}
}


document.addEventListener("keydown", keyfuncInst);

document.addEventListener('DOMNodeRemoved', onchangeInst);
// ==UserScript==
// @name         Youtube next-prev chapter
// @version      0.1
// @description  next-prev chapter on N or B key press
// @author       4cd87a
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

function next_chapter() {
	console.log('next_chapter');
	var ct = document.getElementsByTagName('video')[0].currentTime;
	var points = document.querySelectorAll('[id=endpoint]');
	var t = 0;
    var s = "";
	var ended = true;
	for(var i=0; i<points.length; i++) {
		s = points[i].href;
		t = parseInt(s.substring(s.lastIndexOf("=")+1,s.lastIndexOf("s")));
		if (t>ct){
			ended = false;
			break;
		}
	}
	if (!ended) {
		document.getElementsByTagName('video')[0].currentTime = t;
	}

}
function prev_chapter() {
	console.log('prev_chapter');
	var ct = document.getElementsByTagName('video')[0].currentTime;
	var points = document.querySelectorAll('[id=endpoint]');
	var t = 0;
	var s = "";
	var ended = true;
	for(var i=0; i<points.length; i++) {
		s = points[i].href;
		t = parseInt(s.substring(s.lastIndexOf("=")+1,s.lastIndexOf("s")));
		if (t>ct){
			ended = false;
			break;
		}
	}
	if (i-2>=0){
		s = points[i-2].href;
		t = parseInt(s.substring(s.lastIndexOf("=")+1,s.lastIndexOf("s")));
		document.getElementsByTagName('video')[0].currentTime = t;
	}

}

var smplkeyEvent = function (event) {
	if (document.getElementsByTagName('video').length && document.querySelectorAll('[id=endpoint]').length) {
		// console.log(event.keyCode);
	    if (event.keyCode==78) {
	        next_chapter();
	    }
	    if (event.keyCode==66) {
	        prev_chapter();
	    }
	}
};

document.addEventListener("keydown", smplkeyEvent, false);


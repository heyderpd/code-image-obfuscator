
function initialize(){
	after = document.getElementsByClassName('after')[0];
	before = document.getElementsByClassName('before')[0];
	canvas = document.getElementsByTagName('canvas')[0];
	cio = window.module.cio;
}

function convert(){
	cio.setData({
		text: before.value,
		imgId: "ideia",
		canvasId: "canvasImg"});	
}

function revert(){
	after.value = cio.getData();
}

var after, before, canvas, data, cio;

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize();
	}
}

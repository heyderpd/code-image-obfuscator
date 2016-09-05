
function initialize(){
	after = document.getElementsByClassName('after')[0];
	before = document.getElementsByClassName('before')[0];
	canvas = document.getElementsByTagName('canvas')[0];
}

function convert(){
	data = before.value;
	CodeImageObfuscator.SetData({text: data, image: "ideia"});
}

function revert(){
	after.value = CodeImageObfuscator.GetData();
}

var after, before, canvas, data, CodeImageObfuscator;

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize();
	}
}

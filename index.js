function initialize(){
	after = document.getElementsByClassName('after')[0];
	before = document.getElementsByClassName('before')[0];
	canvas = document.getElementsByTagName('canvas')[0];

	JSInImgEncode.Initialize();
}

function convert(){
	data = before.value;
	JSInImgEncode.Set(data, canvas);
}

function revert(){
	after.value = JSInImgEncode.Get();
}

var after, before, canvas, data;

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize();
	}
}
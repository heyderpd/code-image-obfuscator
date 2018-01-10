
let after, before, cio

function initialize(){
	after = document.getElementsByClassName('after')[0]
	before = document.getElementsByClassName('before')[0]
	cio = window.module.cio
}

function convert(){
	cio.data.set({
		text: before.value,
		imgId: "ideia",
		canvasId: "canvasImg"
	})
}

function revert(){
	cio.load.canvas("canvasImg")
	after.value = cio.data.get()
}

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize()
	}
}

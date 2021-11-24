
const originalImage = "ideia"
const newImage = "canvas"

let after, before

function initialize () {
	after = document.getElementsByClassName('after')[0]
	before = document.getElementsByClassName('before')[0]
}

async function convert () {
	window.cio.Save(originalImage, before.value, newImage)
}

async function revert () {
	after.value = await window.cio.Load(newImage)
}

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize()
	}
}

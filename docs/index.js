
const originalImage = "ideia"
const newImage = "canvas"

let after, before, hideCodeOnImage = true

function initialize () {
	after = document.getElementsByClassName('after')[0]
	before = document.getElementsByClassName('before')[0]
	changeShowCodeOnImage()
	duplicateInputSize()
}

async function duplicateInputSize () {
  const size = 30
  before.value = new Array(size).fill(0).map(_ => before.value).join('\n')
}

async function convert () {
	window.cio.Save(originalImage, before.value, newImage)
}

async function revert () {
	after.value = await window.cio.Load(newImage)
}

async function changeShowCodeOnImage () {
	hideCodeOnImage = !hideCodeOnImage
	window.cio.SetMessageVisible(hideCodeOnImage)
}

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initialize()
	}
}

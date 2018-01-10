# CODE IMAGE OBFUSCATOR

## Plugin that converts text to image and reverte.
## Please use it responsibly! Do not use it for an illegal purpose.

## Motivation
Attempt to hide a javascript file during transmission.

## Attention
Support only png without transparency. Because the transparency destroy the data

## Future / Features
* [DONE] Use a source image and merge changing the least original.
* Hide the original data using a password.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

## First Steps
* install canvas see [npm-canvas](https://www.npmjs.com/package/canvas)
* npm install code-image-obfuscator

## Example [nodejs]:
```javascript
import fs from 'fs'
import { load, save, injectData, recoveryData } from 'code-image-obfuscator'
// SAVE
{
  // data before merge with imagem
  let before = fs.readFileSync('README.md', 'utf8')

  // load img to canvas
  load('./photo.png')

  // merged data and image
  injectData(before)

  // save new merged image
  save('./photo.png')
}

// LOAD
{
  // load new image with data merged
  load('./photo.png')

  // data recovery from imagem
  let after = recoveryData()
}
```

## Example [browser]:
```javascript
bundle => 'dist/code-image-obfuscator.bundle.js'

function convert(){
	cio.data.set({
		text: message,
		imgId: "id of image",
    canvasId: "id of canvas"
  })
}

function revert(){
	cio.load.canvas("id of canvas")
	return cio.data.get()
}
```

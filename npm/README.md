# CODE IMAGE OBFUSCATOR

## Plugin that converts text to image and reverte.
## Please use it responsibly! Do not use it for an illegal purpose.

## Motivation
Attempt to hide a javascript file during transmission.

## Attention
Support only png without transparency. Because the transparency destroy the data

## Future
* Hide the original data by means of a secret key.
* DONE! Use a source image and merge changing the least original.

## First Steps
Now use es2015, thanks for:
[npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

* install canvas see [npm-canvas](https://www.npmjs.com/package/canvas)
* npm install npm install html-parse-regex


## Example of use:
```javascript
const fs = require('fs');
const { save, convert } = require('code-image-obfuscator')

// data before merge with imagem
let before = fs.readFileSync('README.md', 'utf8');

// load image and merge with data
let canvas = convert({pathFile: './photo.png',
                  text: before})

// save new image with data merged
save('./photo.png');
```

## Example of use:
```javascript
const { load, revert } = require('code-image-obfuscator')

// save new image with data merged
load('./photo.png');

// data recovery from imagem
let after = revert();
```
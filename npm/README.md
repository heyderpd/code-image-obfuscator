# CODE IMAGE OBFUSCATOR

# Plugin that converts text to image and reverte.
Please use it responsibly! Do not use it for an illegal purpose.

## Motivation
Attempt to hide a javascript file during transmission.

## Future
* Hide the original data by means of a secret key.
* DONE! Use a source image and merge changing the least original.

## Example of use:
```javascript
const fs = require('fs');
const { convert, revert, save } = require('code-image-obfuscator')

var after, before, canvas;

// data before merge with imagem
before = fs.readFileSync('README.md', 'utf8');

// load image and merge with data
canvas = convert({pathFile: './photo.png',
                  text: before})

// save new image with data merged
save('photo.png');

// data recovery from imagem
after = revert();
```
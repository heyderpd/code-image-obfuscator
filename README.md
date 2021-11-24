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
import { Save, Load } from 'code-image-obfuscator'

// loading data example
const before = fs.readFileSync('README.md', 'utf8')

// create new img with data
await Save('./photo.png', before, './new-photo.png')

/* to load data from img */
const after = await Load('./new-photo.png')

/* compare data after recovery */
console.log(before == after)
```

## Example [browser]:
```javascript
bundleFoundIn => 'code-image-obfuscator/dist/cio.bundle.js'

// loading data example
const before = 'some-data'

// create new img with data
window.cio.Save('element_id_of_img', before, 'element_id_of_canvas')

/* to load data from img */
const after = await window.cio.Load('element_id_of_canvas')

/* compare data after recovery */
console.log(before == after)
```

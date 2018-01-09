// requided's

const fs = require('fs')

fs.writeFileSync(
    './test/code-image-obfuscator.bundle.js',
    fs.readFileSync(
      './dist/code-image-obfuscator.bundle.js',
      'utf8'))
// fs.writeFileSync(
//     './test/code-image-obfuscator.chunk.js',
//     fs.readFileSync(
//       './npm/code-image-obfuscator.chunk.js',
//       'utf8'))

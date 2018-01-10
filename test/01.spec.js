const fs = require('fs')

fs.writeFileSync(
    './test/code-image-obfuscator.bundle.js',
    fs.readFileSync(
      './dist/code-image-obfuscator.bundle.js',
      'utf8'))


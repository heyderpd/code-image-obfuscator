// requided's

const assert = require('assert')
const fs = require('fs')

const cleardep = require('../npm/index')


// start test

const { convert, revert, save } = require('../npm/index')

let after, before, canvas;

before = fs.readFileSync('./README.md', 'utf8');
after = '';
console.log(__dirname)
describe('cio', function() {
  it('A.png', function() {
    canvas = convert({
      pathFile: './test/ori-a.png',
      text: before})
    save('./test/ori-a.png')
    after = revert()
    fs.writeFileSync('./test/res-A.txt', after)

    assert.deepEqual(
      before,
      after
    )
  })

  it('B.png', function() {
    canvas = convert({
      pathFile: './test/ori-b.png',
      text: before})
    save('./test/ori-b.png')
    after = revert()
    fs.writeFileSync('./test/res-B.txt', after)

    assert.deepEqual(
      before,
      after
    )
  })
})

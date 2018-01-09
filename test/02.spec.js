// requided's

import assert from 'assert'
import fs from 'fs'

import { load, save, injectData, recoveryData } from '../src/server'

let after, before, canvas

before = fs.readFileSync('./README.md', 'utf8')
after = ''

describe('cio', function() {
  it('A.png', done => {
    load('./test/ori-a.png')
    injectData(before)

    save('./test/res-a.png')
    after = recoveryData()

    fs.writeFileSync('./test/res-A.txt', after)
    assert.deepEqual(
      before,
      after
    )
    done()
  })
/*
  it('B.png', function() {
    load('./test/ori-b.png')
    injectData(before)

    save('./test/res-b.png')
    after = recoveryData()

    fs.writeFileSync('./test/res-B.txt', after)
    assert.deepEqual(
      before,
      after
    )
  })*/
})

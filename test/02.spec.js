import assert from 'assert'
import fs from 'fs'

import { load, save, injectData, recoveryData } from '../dist/server'

let after, before, canvas

before = fs.readFileSync('./README.md', 'utf8')
after = ''

const saveInfoIn = fileName => {
  load('./test/before/' + fileName)
  injectData(before)
  save('./test/after/' + fileName)
}

const getInfoFrom = fileName => {
  load('./test/after/' + fileName)
  return recoveryData()
}

describe('cio', function() {
  it('creat files', () => {
    saveInfoIn('ia.png')
    saveInfoIn('ib.png')
  })

  it('A.png', done => {
    setTimeout(_ => {
      after = getInfoFrom('ia.png')
      assert.deepEqual(
        before,
        after
      )
      done()
    }, 1000)
  })

  it('B.png', done => {
    setTimeout(_ => {
      after = getInfoFrom('ib.png')
      assert.deepEqual(
        before,
        after
      )
      done()
    }, 1000)
  })
})

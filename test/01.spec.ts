import * as assert from 'assert'
import * as fs from 'fs'
import { Load, Save } from '../src'

const dataBefore = fs.readFileSync('./README.md', 'utf8')

const testInjection = fileName => {
  Save(`./test/before/${fileName}`, dataBefore)
  return Load(`./test/before/${fileName}`)
}

describe('basic test', function() {
  it('A.png', () => {
    const dataAfter = testInjection('ia.png')
    assert.deepEqual(
      dataBefore,
      dataAfter
    )
  })

  it('B.png', () => {
    const dataAfter = testInjection('ib.png')
    assert.deepEqual(
      dataBefore,
      dataAfter
    )
  })
})

import * as assert from 'assert'
import * as fs from 'fs'
import { Load, Save } from '../src'

const data = fs.readFileSync('./README.md', 'utf8')

const testInjection = async fileName => {
  const originalFile = `./test/before/${fileName}`
  const newFile = `./test/after/${fileName}`
  await Save(originalFile, data, newFile)
  // await Load(newFile)
}

describe('basic test', function() {
  // it('A.png', async done => {
  //   const dataAfter = await testInjection('ia.png')
  //   assert.deepEqual(
  //     data,
  //     dataAfter
  //   )
  //   done()
  // })

  it('B.png', async done => {
    const dataAfter = await testInjection('ib.png')
    assert.deepEqual(
      data,
      dataAfter
    )
    done()
  })
})

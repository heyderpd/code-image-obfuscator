import * as assert from 'assert'
import * as fs from 'fs'
import { SetMessageVisible, Load, Save } from '../src'

const data = fs.readFileSync('./README.md', 'utf8')

const testInjection = async (fileName, newFileName=null) => {
  if (!newFileName) {
    newFileName = fileName
  } else {
    SetMessageVisible(true)
  }
  const originalFile = `./test/before/${fileName}`
  const newFile = `./test/after/${newFileName}`
  await Save(originalFile, data, newFile)
  return await Load(newFile)
}

describe('basic test', function() {

  it('A.png', async function () {
    const dataAfter = await testInjection('ia.png')
    assert.strictEqual(data, dataAfter)
  })

  it('A-override.png', async function () {
    const dataAfter = await testInjection('ia.png', 'ia-override.png')
    assert.strictEqual(data, dataAfter)
  })

  it('B.png', async function () {
    const dataAfter = await testInjection('ib.png')
    assert.strictEqual(data, dataAfter)
  })
  
  it('B.png', async function () {
    const dataAfter = await testInjection('ib.png', 'ib-override.png')
    assert.strictEqual(data, dataAfter)
  })

})

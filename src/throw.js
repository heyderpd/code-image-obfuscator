const throwError = (info = '', data = false) => {
  let errorMsg = ''

  if (info && data) {
    try {
      errorMsg = `[code-image-obfuscator]: ${info} received:[${JSON.stringify(data)}]`
    } catch (err) {}
  }

  if (info) {
    errorMsg = `[code-image-obfuscator]: ${info}`
  }

  throw new Error(errorMsg)
}

export default throwError

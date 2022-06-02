const fs = require('fs')
const { Transform } = require('stream')

exports.default = () => {
  // 文件读取流
  const readStream = fs.createReadStream('normalize.css')

  // 文件写入流
  const writeStream = fs.createWriteStream('normalize.min.css')

  // 文件转换流
  const transformStream = new Transform({
    // 核心转换过程
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString()
      // 空白字符 替换代码当中的css注释
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      // callback 函数式错误优先的对象，没有错误就传递一个Null
      callback(null, output)
    }
  })

  return readStream
    .pipe(transformStream) // 转换
    .pipe(writeStream) // 写入
}

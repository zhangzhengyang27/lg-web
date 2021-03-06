const fs = require('fs')

exports.callback = done => {
    console.log('callback task')
    done()
}

exports.callback_error = done => {
    console.log('callback task')
    done(new Error('task failed'))
}

exports.promise = () => {
    console.log('promise task')
    // Promise.resolve 代表任务已经结束了
    return Promise.resolve()
}

exports.promise_error = () => {
    console.log('promise task')
    return Promise.reject(new Error('task failed'))
}

const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
// 内部还是promise
exports.async = async () => {
    await timeout(1000)
    console.log('async task')
}
// 起到文件复制的左右
exports.stream = () => {
    const read = fs.createReadStream('yarn.lock')
    const write = fs.createWriteStream('a.txt')
    read.pipe(write)
    return read
}

// exports.stream = done => {
//   const read = fs.createReadStream('yarn.lock')
//   const write = fs.createWriteStream('a.txt')
//   read.pipe(write)
//   read.on('end', () => {
//     done()
//   })
// }

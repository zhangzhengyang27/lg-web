#!/usr/bin/env node

// mac 文件读写权限 755
// 命令行的参数可以通过process.argv获取，可以通过push向命令行传递参数
process.argv.push('--cwd')
process.argv.push(process.cwd())
process.argv.push('--gulpfile')
process.argv.push(require.resolve('..'))

// 载入node-modules模块下的命令
console.log(process.argv)
require('gulp/bin/gulp')

const { src, dest } = require('gulp')
// 压缩css代码的转换流
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}

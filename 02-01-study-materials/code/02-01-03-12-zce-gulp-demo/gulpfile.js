const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
// 开发服务器，可以热更新
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()
// gulp-sass no longer has a default Sass compiler; please set one yourself.
// Both the "sass" and "node-sass" packages are permitted.
// For example, in your gulpfile:
// 要安装sass
const sass = require('gulp-sass')(require('sass'))


const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}
// 清除文件
const clean = () => {
  return del(['dist', 'temp'])
}
// 样式的编译任务  outputStyle: 'expanded' 最后一个}在换行输出
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    // .pipe(plugins.sass({outputStyle: 'expanded'}))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 字体文件
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 额外的文件 public下得文件直接拷贝过去
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    // files: 'dist/**',
    server: {
      // 提高构建效率  文件先从temp、src、public顺序查找
      baseDir: ['temp', 'src', 'public'],
      routes: {
        // 转到 node_modules 下找文件
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // html js css  uglif压缩js cleanCss压缩css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

// 编译任务
const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}

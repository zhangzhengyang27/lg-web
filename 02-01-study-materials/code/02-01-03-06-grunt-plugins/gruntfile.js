const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    // 输出路径:原路径
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        // 转换es6
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}
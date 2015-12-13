module.exports = function (grunt) {

    'use strict'

    require('load-grunt-tasks')(grunt)

    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: 'js/.eslintrc'
            },
            js: [
                'Gruntfile.js',
                'js/src/*.js',
                'js/tests/unit/*.js'
            ]
        },

        compress: {
            main: {
                options: {
                    archive: '<%= pkg.name %>.zip',
                    level: 9
                },
                src: ['dist/**', 'LICENSE', 'README.md']
            }
        },

        jscs: {
            options: {
                config: 'js/.jscsrc'
            },
            files: {
                src: [
                    'Gruntfile.js',
                    'js/src/*.js',
                    'js/tests/unit/*.js'
                ]
            }
        },

        copy: {
            main: {
                src: 'js/src/DateAgo.js',
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        qunit: {
            options: {
                coverage: {
                    src: 'js/src/*.js',
                    instrumentedFiles: 'temp/',
                    htmlReport: 'build/coverage',
                    lcovReport: 'build/'
                }
            },
            all: ['js/tests/index.html']
        },

        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                preserveComments: 'some'
            },
            core: {
                src: '<%= copy.main.dest %>',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        }
    })

    grunt.registerTask('js', ['copy', 'uglify'])
    grunt.registerTask('test', ['eslint', 'jscs', 'qunit'])
    grunt.registerTask('dist', ['default', 'compress'])
    grunt.registerTask('default', ['js'])
}

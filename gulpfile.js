'use strict';

/* ----------------------------------------------------------------------- */
/* Gulp, Plugins, and Globals */
/* ----------------------------------------------------------------------- */

var gulp = require('gulp'),
    livingcss = require('livingcss'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    svgSprite = require('gulp-svg-sprite'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path'),
    dest = {
        src: 'src',
        dist: 'dist'
    };


/* ----------------------------------------------------------------------- */
/* Styleguide Generator https://github.com/straker/livingcss */ 
/* ----------------------------------------------------------------------- */

livingcss(dest.src + '/styles/**/*.scss', dest.dist + '/styleguide', {
  
    loadcss: true,
    minify: true,
  
    preprocess: function(context, template, Handlebars) {
        context.title = 'Style Guide';
        context.footerHTML = 'Think Shift';
    },

    template: dest.src + '/templates/styleguide/styleguide.hb'
});


/* ----------------------------------------------------------------------- */
/* SASS */
/* ----------------------------------------------------------------------- */

(function () {

    // SASS settings
    var files = [
            dest.src + '/styles/main.scss'
        ],
        options = {
            src: {
                autoprefixer: {
                    browsers: ['last 3 versions', '> 2%']
                }
            },
            dist: {
                sass: {
                    outputStyle: 'compressed'
                },
                autoprefixer: {
                    browsers: ['last 3 versions', '> 2%'],
                    cascade: false
                }
            }
        };

    // Source
    gulp.task('sass', function() {

        // Create sourcemap
        // Compile SASS
        // Add sourcemap to CSS
        // Prefix styles based on above array
        // Save CSS file to src
        // Refresh browser
        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer(options.src.autoprefixer))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest.src + '/styles'));
    });

    // Distribution
    gulp.task('sass--build', function() {

        // Compile and minify SASS
        // Prefix styles based on above array
        // Save to dist
        return gulp.src(files)
            .pipe(sass(options.dist.sass).on('error', sass.logError))
            .pipe(autoprefixer(options.dist.autoprefixer))
            .pipe(gulp.dest(dest.dist + '/styles'));
    });
}());



/* ----------------------------------------------------------------------- */
/* JavaScript */
/* ----------------------------------------------------------------------- */

// Main
(function () {

    // JavaScript settings
    var files = [
            dest.src + '/scripts/main.js'
        ];

    // Source
    gulp.task('js-main', function() {

        // Lint JavaScript
        return gulp.src(files)
            .pipe(jshint());
    });

    // Distribution
    gulp.task('js-main--build', function() {

        // Lint JavaScript
        // Minify JavaScript
        // Save to dist
        return gulp.src(files)
            .pipe(jshint())
            .pipe(uglify())
            .pipe(gulp.dest(dest.dist + '/scripts'));
    });
}());

// Plugins
(function () {

    var files = [
            dest.src + '/scripts/plugins/**/*.js'
        ];

    // Source
    gulp.task('js-plugin', function() {

        // Concatenate files
        // Save to src
        return gulp.src(files)
            .pipe(concat('plugins.js'))
            .pipe(gulp.dest(dest.src + '/scripts'));
    });

    // Distribution
    gulp.task('js-plugin--build', function() {

        // Concatenate files
        // Minify JavaScript
        // Save to dist
        return gulp.src(files)
            .pipe(concat('plugins.js'))
            .pipe(uglify())
            .pipe(gulp.dest(dest.dist + '/scripts'));
    });
}());



/* ----------------------------------------------------------------------- */
/* SVG Sprite */
/* ----------------------------------------------------------------------- */

(function () {

    var files = [
            dest.src + '/images/sprites/*.svg'
        ],
        options = {
            src: {
                svgSprite: {
                    shape: {
                        dimension: {
                            maxWidth: 40,
                            maxHeight: 40
                        },
                        spacing: {
                            padding: 0
                        },
                        transform: [{
                            svgo: {
                                plugins : [
                                    { removeTitle: true }
                                ]
                            }
                        }]
                    },
                    svg: {
                        xmlDeclaration: false
                    },
                    mode: {
                        symbol: {
                            dest: '.',
                            sprite: 'sprite.svg'
                        }
                    }
                }
            }
        };

    // Source
    gulp.task('svg-sprite', function() {

        // Create SVG sprite
        // Save to src
        return gulp.src(files)
            .pipe(svgSprite(options.src.svgSprite))
            .pipe(gulp.dest(dest.src + '/images'));
    });
}());



/* ----------------------------------------------------------------------- */
/* Image Compression */
/* ----------------------------------------------------------------------- */

(function () {

    var files = [
            dest.src + '/images/**',
            '!' + dest.src + '/images/sprite/**'
        ],
        options = {
            src: {
                imagemin: {
                    optimizationLevel: 5,
                    progressive: true,
                    interlaced: true
                }
            }
        };

    // Source
    gulp.task('images', function() {

        // Compress files
        // Save to src
        return gulp.src(files)
            .pipe(cache(imagemin(options.src.imagemin)))
            .pipe(gulp.dest(dest.src + '/images'));
    });
}());



/* ----------------------------------------------------------------------- */
/* Copy Files for Distribution */
/* ----------------------------------------------------------------------- */

(function () {

    var files = [
            dest.src + '/**',
            dest.src + '/.htaccess',
            '!' + dest.src + '/**/*.md',
            '!' + dest.src + '/fonts/',
            '!' + dest.src + '/images/sprites/',
            '!' + dest.src + '/images/sprites/**',
            '!' + dest.src + '/styles/**',
            '!' + dest.src + '/scripts/main.js',
            '!' + dest.src + '/scripts/plugins.js',
            '!' + dest.src + '/scripts/plugins/',
            '!' + dest.src + '/scripts/plugins/**'
        ];

    // Distribution
    gulp.task('copy--build', function() {

        // Copy files to dist
        return gulp.src(files)
            .pipe(gulp.dest(dest.dist));
    });
}());



/* ----------------------------------------------------------------------- */
/* File Watchers */
/* ----------------------------------------------------------------------- */

(function () {

    var sass_files = [
            dest.src + '/styles/**/*.scss'
        ],
        js_main_files = [
            dest.src + '/scripts/main.js'
        ],
        js_plugin_files = [
            dest.src + '/scripts/plugins/**/*.js'
        ],
        svg_sprite_files = [
            dest.src + '/images/sprites/*.svg'
        ],
        image_files = [
            dest.src + '/images/**/*.gif',
            dest.src + '/images/**/*.jpg',
            dest.src + '/images/**/*.png',
            dest.src + '/images/**/*.svg',
            '!' + dest.src + '/images/sprite/**'
        ];

    gulp.task('watch', function() {

        // SASS
        gulp.watch(sass_files, ['sass']);

        // JavaScript Files
        gulp.watch(js_main_files, ['js-main']);
        gulp.watch(js_plugin_files, ['js-plugin']);

        // SVG Sprite
        gulp.watch(svg_sprite_files, ['svg-sprite']);

        // Image Compression
        gulp.watch(image_files, ['images']);
    });
}());



/* ----------------------------------------------------------------------- */
/* Default Gulp Task */
/* ----------------------------------------------------------------------- */

(function () {

    var tasks = [
        'sass',
        'js-main',
        'js-plugin',
        'svg-sprite',
        'images',
        'watch'
    ];

    gulp.task('default', tasks);
}());



/* ----------------------------------------------------------------------- */
/* Build Task */
/* ----------------------------------------------------------------------- */

(function () {

    var tasks = [
        'sass--build',
        'js-main--build',
        'js-plugin--build',
        'copy--build'
    ];

    gulp.task('build', tasks);
}());

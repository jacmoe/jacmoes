/*
* This file is part of
*  _ __  _   _ _ __   ___
* | '_ \| | | | '_ \ / _ \
* | |_) | |_| | |_) |  __/
* | .__/ \__, | .__/ \___|
* |_|    |___/|_|
*                 Personal Yii Page Engine
*
*	Copyright (c) 2016 Jacob Moen
*	Licensed under the MIT license
*/

// fix problems with undefined Promise class
// http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined
require('es6-promise').polyfill();

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
babel = require('gulp-babel'),
browsersync = require('browser-sync'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
gulpif = require('gulp-if'),
runSequence = require('run-sequence');

var theme = 'zurbie';

var PATHS = {
    sass: [
        'bower_components/foundation-sites/scss',
        'bower_components/motion-ui/src'
    ],
    javascript: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/what-input/what-input.js',
        // Core Foundation files
        'bower_components/foundation-sites/js/foundation.core.js',
        'bower_components/foundation-sites/js/foundation.util.*.js',
        // Individual Foundation components
        // 'bower_components/foundation-sites/js/foundation.abide.js',
        // 'bower_components/foundation-sites/js/foundation.accordion.js',
        // 'bower_components/foundation-sites/js/foundation.accordionMenu.js',
        // 'bower_components/foundation-sites/js/foundation.drilldown.js',
        // 'bower_components/foundation-sites/js/foundation.dropdown.js',
        // 'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
        // 'bower_components/foundation-sites/js/foundation.equalizer.js',
        // 'bower_components/foundation-sites/js/foundation.interchange.js',
        // 'bower_components/foundation-sites/js/foundation.magellan.js',
        // 'bower_components/foundation-sites/js/foundation.offcanvas.js',
        // 'bower_components/foundation-sites/js/foundation.orbit.js',
        // 'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
        // 'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
        // 'bower_components/foundation-sites/js/foundation.reveal.js',
        // 'bower_components/foundation-sites/js/foundation.slider.js',
        // 'bower_components/foundation-sites/js/foundation.sticky.js',
        // 'bower_components/foundation-sites/js/foundation.tabs.js',
        // 'bower_components/foundation-sites/js/foundation.toggler.js',
        // 'bower_components/foundation-sites/js/foundation.tooltip.js',
        // Own js
        'themes/zurbie/js/lightbox.js'
        //'themes/' + theme + '/js/custom.js'
    ]
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: PATHS.sass
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Styles
gulp.task('styles', function() {
    return gulp.src('themes/' + theme + '/scss/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../themes/' + theme + '/scss/' }))
    .pipe(gulp.dest('themes/' + theme + '/dist/css'))
    .pipe(gulpif('*.css', rename({ suffix: '.min' })))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.css', gulp.dest('themes/' + theme + '/dist/css')))
    .pipe(gulpif('*.css', notify({ message: 'Styles task complete' })));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(PATHS.javascript)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../js/' }))
    .pipe(gulp.dest('themes/' + theme + '/dist/js'))
    .pipe(gulpif('*.js', rename({ suffix: '.min' })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest('themes/' + theme + '/dist/js')))
    .pipe(gulpif('*.js', notify({ message: 'Scripts task complete' })));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src([
        'themes/' + theme + '/scss/2-vendors/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./themes/' + theme + '/dist/fonts'));
});

// Clean
gulp.task('clean', function() {
    return del(['themes/' + theme + '/dist/css/*', 'themes/' + theme + '/dist/js/*', 'themes/' + theme + '/dist/fonts/*']);
});

// Build the "web" folder by running all of the above tasks
gulp.task('build', function(callback) {
    runSequence('clean', ['styles', 'scripts', 'fonts'], callback);
});

// Watch
gulp.task('watch', function() {

    // Initialize Browsersync
    browsersync.init({
        proxy: "https://local.jacmoe.dk"
    });

    // Watch .scss files
    gulp.watch('themes/' + theme + '/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('themes/' + theme + '/js/**/*.js', ['scripts']);

    // Watch any view files in 'views', reload on change
    gulp.watch(['themes/' + theme + '/views/**/*.jade']).on('change', browsersync.reload);
    gulp.watch(['themes/' + theme + '/views/**/*.php']).on('change', browsersync.reload);

    // Watch any files in 'web', reload on change
    gulp.watch(['themes/' + theme + '/dist/js/*']).on('change', browsersync.reload);
    gulp.watch(['themes/' + theme + '/dist/css/*']).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'watch'], function() {});

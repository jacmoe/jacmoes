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
browsersync = require('browser-sync'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
gulpif = require('gulp-if'),
runSequence = require('run-sequence');

var PATHS = {
    sass: [
        'bower_components/bourbon/app/assets/stylesheets/',
        'bower_components/neat/app/assets/stylesheets/',
        'bower_components/font-awesome/scss/'
    ],
    javascript: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lightbox2/dist/js/lightbox.js',
        'themes/bourbon/js/jquery.sticky.js',
        'themes/bourbon/js/custom.js'
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
    return gulp.src('themes/bourbon/scss/all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../themes/bourbon/scss/' }))
    .pipe(gulp.dest('themes/bourbon/dist/css'))
    .pipe(gulpif('*.css', rename({ suffix: '.min' })))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.css', gulp.dest('themes/bourbon/dist/css')))
    .pipe(gulpif('*.css', notify({ message: 'Styles task complete' })));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(PATHS.javascript)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.', { sourceRoot: '../../js/' }))
    .pipe(gulp.dest('themes/bourbon/dist/js'))
    .pipe(gulpif('*.js', rename({ suffix: '.min' })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest('themes/bourbon/dist/js')))
    .pipe(gulpif('*.js', notify({ message: 'Scripts task complete' })));
});

// Copy fonts
gulp.task('fonts', function() {
    return gulp.src([
        'bower_components/font-awesome/fonts/*',
        'themes/bourbon/fonts/*'
    ])
    .pipe(gulp.dest('./themes/bourbon/dist/fonts'));
});

// Clean
gulp.task('clean', function() {
    return del(['themes/bourbon/dist/css/*', 'themes/bourbon/dist/js/*', 'themes/bourbon/dist/fonts/*']);
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
    gulp.watch('themes/bourbon/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('themes/bourbon/js/**/*.js', ['scripts']);

    // Watch any view files in 'views', reload on change
    gulp.watch(['themes/bourbon/views/**/*.jade']).on('change', browsersync.reload);
    gulp.watch(['themes/bourbon/views/**/*.php']).on('change', browsersync.reload);

    // Watch any files in 'web', reload on change
    gulp.watch(['themes/bourbon/dist/js/*']).on('change', browsersync.reload);
    gulp.watch(['themes/bourbon/dist/css/*']).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'watch'], function() {});

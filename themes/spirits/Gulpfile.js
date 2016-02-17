// Load plugins
var $ = require('gulp-load-plugins')();
var gulp = require('gulp'),
  browsersync = require('browser-sync'),
  del = require('del'),
  runSequence = require('run-sequence');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Styles
gulp.task('styles', function() {
  return gulp.src('scss/app.scss')
  .pipe($.sass(sassOptions).on('error', $.sass.logError))
  .pipe($.autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('dist/css'))
  .pipe($.if('*.css', $.rename({ suffix: '.min' })))
  .pipe($.if('*.css', $.cssnano()))
  .pipe($.if('*.css', gulp.dest('dist/css')))
  .pipe($.notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('js/**/*.js')
  .pipe($.concat('script.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe($.if('*.js', $.rename({ suffix: '.min' })))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', gulp.dest('dist/js')))
  .pipe($.notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/css', 'dist/js'])
});

// Default task
gulp.task('default', function(callback) {
  runSequence('clean', ['styles', 'scripts'], callback);
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('scss/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Create LiveReload server
  browsersync.init({
    proxy: "http://local.jacmoe.dk"
  });

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browsersync.reload);
  // Watch any haml files in ./, reload on change
  gulp.watch(['./*haml']).on('change', browsersync.reload);
  // Watch any md files in ../../content/, reload on change
  gulp.watch(['../../content/**/*.md']).on('change', browsersync.reload);
});

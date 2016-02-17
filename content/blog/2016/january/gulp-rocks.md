<!--
Title: Gulp Rocks
Author: Jacob Moen
Date: 2016/01/12 01:02
Datetime: 2016-01-12
Description: I totally made the switch from Grunt to Gulp
Template: post
Disqusid: /2016/january/gulp-rocks
ogimage: gulp/gulp.png
thumb: gulp/gulp_custom.png
Keywords: gulp, grunt, sass, nodejs, javascript
Tags: nodejs, gulp, programming
blogpost: true
published: true
-->
(lightbox:Gulp source:gulp/gulp_mobile.png target:gulp/gulp.png)
A while ago I was a happy user of the [Grunt](http://gruntjs.com/) javascript task runner. I wasn't a very advanced user, though. Mainly because I had trouble wrangling the bulky configuration scripts, but also because it did not fill me with excitement - it was merely a capable build tool.

Then I heard about [Gulp](http://gulpjs.com/) that was supposedly *changing* _**"everything"**_ but I am not the one to jump on any hyped bandwagons just *because*.

I was not going to switch from Grunt to Gulp just because some fanboys said that it blows the other out of the water.

But, then I read an article by *Mark Goodyear* entitled [Getting started with gulp](https://markgoodyear.com/2014/01/getting-started-with-gulp/) and I was instantly sold on Gulp.
(clearfix:)
## Grunt versus Gulp
Allow me to blatantly copy the example that his article starts out with - a comparison between Grunt and Gulp.

### Grunt
```
sass: {
  dist: {
    options: {
      style: 'expanded'
    },
    files: {
      'dist/assets/css/main.css': 'src/styles/main.scss',
    }
  }
},

autoprefixer: {
  dist: {
    options: {
      browsers: [
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
      ]
    },
    src: 'dist/assets/css/main.css',
    dest: 'dist/assets/css/main.css'
  }
},

grunt.registerTask('styles', ['sass', 'autoprefixer']);
```
### Gulp
```
gulp.task('sass', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
});
```
Much neater, the Gulp version, in'it?

Grunt is configuration based, and for each separate tool configuration, you need to specify source and destination.  
The tool operates in a sequential fashion, so for each operation the files are opened and outputted.

Gulp, on the other hand, uses streams to pipe operations together on the same input/output.  
Gulp is also code oriented, where Grunt is configuration oriented.

The above code examples are what instantly sold me on Gulp!  
Being the lazy programmer I am, I like a build tool that lets me do more with less code. :)

## More perks
Besides being terser than Grunt, Gulp has more tricks up its sleeve.

To demonstrate that, let me post my last Grunt script that I used a while back before I swithed to Gulp:
```
module.exports = function(grunt)
{
  // -----------------------------------------
  // Start Grunt configuration
  // -----------------------------------------

  grunt.initConfig({

    // Load package.json file
    pkg: grunt.file.readJSON('package.json'),

    // --------------------------------------
    // Clean Configuration
    // --------------------------------------
    clean: {
      options: {
        force: true
      },
      js:    ["dist/js/"],
      css:   ["dist/css/"],
      assets: [
        "dist/*",
        "!dist/.gitignore"
      ]
    },

    // --------------------------------------
    // Sass Configuration
    // --------------------------------------
    sass: {
      options: {
        loadPath: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          sourcemap: 'none',
          style: 'nested'
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    // --------------------------------------
    // CSS Minify Configuration
    // --------------------------------------
    cssmin: {
      target: {
        files: {
          'dist/css/app.min.css': ['srccss/lightbox.css',
          'srccss/solarized_dark.css',
          'srccss/scrollup.css',
          'foundation-icons/foundation-icons.css',
          'dist/css/app.css']
        }
      }
    },

    // --------------------------------------
    // Concatenate Configuration
    // --------------------------------------
    concat: {
      options: {
        separator: ';'
      },
      script: {
        src: [
          'bower_components/foundation/js/foundation/foundation.js',
          'bower_components/foundation/js/foundation/foundation.topbar.js',
          'bower_components/foundation/js/foundation/foundation.dropdown.js',
          // ...more foundation JS you might want to add
          'js/toc.js',
          'js/highlight.pack.js',
          'js/lightbox.js',
          'js/jquery.scrollUp.js',
          'js/script.js'
        ],
        dest: 'dist/js/script.js'
      },
      modernizr: {
        src: [
          'bower_components/modernizr/modernizr.js',
          'js/custom.modernizr.js'
        ],
        dest: 'dist/js/modernizr.js'
      }
    },

    // --------------------------------------
    // Uglify Configuration
    // --------------------------------------
    uglify: {
      dist: {
        files: {
          'dist/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
          'dist/js/modernizr.min.js': ['dist/js/modernizr.js'],
          'dist/js/script.min.js': ['dist/js/script.js']
        }
      }
    },

    // --------------------------------------
    // Watch Configuration
    // --------------------------------------
    watch: {
      grunt: { files: ['Gruntfile.js'], tasks: ['default'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['buildCss']
      },

      script: {
        files: 'js/**/*.js',
        tasks: ['buildJs']
      }
    }
  });

  // -----------------------------------------
  // Load Grunt tasks
  // -----------------------------------------
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // -----------------------------------------
  // Register Grunt tasks
  // -----------------------------------------
  grunt.registerTask('buildCss', ['clean:css', 'sass', 'cssmin']);
  grunt.registerTask('buildJs',  ['clean:js', 'concat', 'uglify']);
  grunt.registerTask('default',  ['clean', 'buildCss', 'buildJs', 'watch']);
}
```
What the 'script' does - when you run `grunt` - is to perform 8 operations in sequence: clean, clean css, run sass on source scss, run css minify on the generated css, clean js, concatenate the source js files, run uglify on the concatenated js and enter the watch state.

Now, here is an example of a Gulp script that I wrote for one of my latest projects:
```
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
```
While I am not going into too much detail about the script, please notice that the Gulp script is shorter than the Grunt script and does a lot more.

What the Gulp script does is this:  
It defines 5 tasks: clean, styles, scripts, watch and default.   The *Styles* task runs sass and autoprefixer on the input and specifies destination, it then renames the extension to 'min' and runs a css minifier to the same destination before it ends with a notification that the script was run.  
The *Scripts* task is build in a similar fashion.  

The *Default* is interesting, because it first runs the *Clean* task and then runs *Styles* and *Scripts* **in parallel** - yes: they run at the same time, not sequentially, but in parallel.

So, not only is the script faster because it does not open and close files for each operation, it is also faster because the tasks can be run at the same time (in parallel).

With a shorter script, my build tool not only is faster, but also has more features, like auto-prefixer and [browser-sync](https://www.browsersync.io/), just because I could  - and because it was fun to do it. :)

## Notes
If you want a more fair comparison between two scripts - one using Grunt and one using Gulp - then check out this Gist by Mark Goodyear: [Comparison between gulp and Grunt.](https://gist.github.com/markgoodyear/8497946#file-gruntfile-js)

But I am sold on Gulp - and have probably already written a new and better Gulp build script for my newest project as of this writing.  
Because I can :)

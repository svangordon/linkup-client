var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    jshint      = require('gulp-jshint')
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    data        = require('gulp-data'),
    stylus      = require('gulp-stylus'),
    htmlmin     = require('gulp-htmlmin'),
    nodemon     = require('gulp-nodemon'),
    path        = require('path'),
    del         = require('del'),
    Cache       = require('gulp-file-cache'),
    livereload  = require('gulp-livereload'),
    notify      = require('gulp-notify'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

const cache = new Cache();

// livereload({start: true})

const paths = {
  scripts:  ['src/**/*.js'],
  stylus:   ['src/**/*.styl'],
  html:     ['src/**/*.html'],
  json:     ['src/**/*.json'],
  public:   'dist',
  server: {
    src:    ['src/server/**/*.js'],
    dist:  'dist/server'
  }
};

const extensions = 'html js styl json';

gulp.task('default', ['serve'], () => { //use 'serve' or 'dev' depending on which file server you want to use
  // gulp.start('dev');
  // gulp.watch('src/**/*.*', ['build-all']);
});

gulp.task('clean', (cb) => {
  console.log('clean fired')
  return del(['dist']);
});

gulp.task('build', ['scripts', 'html', 'stylus', 'json'], () => {
  // gulp.start('scripts', 'html', 'stylus', 'json');
});

gulp.task('json', () => {
  return gulp.src(paths.json)
    .pipe(gulp.dest(paths.public))
    .pipe(plugins.connect.reload());
});

gulp.task('dev', ['build', 'watch'], () => {
  livereload.listen();
  return nodemon({
    script: './server.js'
    , env: {'NODE_ENV': 'development'}
    , ext: extensions
    , watch: 'src'
    , tasks: ['build-all']
  });
  return stream;
});

gulp.task('scripts', () => {
  var sources = browserify({
    entries: 'src/angular/app.js',
    debug: true
  })
  .transform(babelify.configure({
    presets: ["es2015"]
  }));

  return sources.bundle()
    .pipe(vinylSourceStream('app.min.js'))
    .pipe(vinylBuffer())
    .pipe(plugins.sourcemaps.init({
            // loadMaps: true // load sourcemaps, if jshint had actually run
    }))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.sourcemaps.write('./', {
      includeContent: true
    }))
    .pipe(gulp.dest(paths.public))
    .pipe(plugins.connect.reload());

  //   .pipe(sourcemaps.init())
  //   // .pipe(cache.filter())
  //   .pipe(babel({
  //     presets: ['es2015-script']
  //   }))
  //   .pipe(concat('bundle.js'))
  //   // .pipe(cache.cache())
  //   .pipe(sourcemaps.write())
  //   .pipe(gulp.dest(paths.public))
  //   // .pipe(livereload());
  // return stream;
});

gulp.task('serve', ['build', 'watch'], function() {
	plugins.connect.server({
		root: 'dist/',
		port: 4242,
		livereload: true,
		fallback: paths.public + '/index.html'
	});
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    // .pipe(sourcemaps.init())
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public))
    .pipe(plugins.connect.reload());
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public))
    .pipe(plugins.connect.reload());
});

// gulp.task('server', () => {
//   return gulp.src(paths.server.src)
//     // .pipe(cache.filter())
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     // .pipe(cache.cache())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(paths.server.dist))
//   return stream;
// });

gulp.task('watch', function() {
	gulp.watch(paths.json, ['json']);
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylus, ['stylus']);
})

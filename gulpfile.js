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
    notify      = require('gulp-notify');

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

gulp.task('default', ['clean'], () => {
  gulp.start('build-all');
  gulp.watch('src/**/*.*', ['build-all']);
});

gulp.task('clean', (cb) => {
  console.log('clean fired')
  return del(['dist']);
});

gulp.task('build-all', () => {
  gulp.start('scripts', 'html', 'stylus', 'json');
});

gulp.task('json', () => {
  return gulp.src(paths.json)
    .pipe(gulp.dest(paths.public))
});

// gulp.task('dev', ['build-all', 'server'], () => {
//   // livereload.listen();
//   // return nodemon({
//   //   script: './dist/server/server.js'
//   //   , env: {'NODE_ENV': 'development'}
//   //   , ext: extensions
//   //   , watch: 'src'
//   //   , tasks: ['build-all']
//   // });
//   // return stream;
// });

gulp.task('scripts', () => {
  const stream = gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    // .pipe(cache.filter())
    .pipe(babel({
      presets: ['es2015-script']
    }))
    .pipe(concat('bundle.js'))
    // .pipe(cache.cache())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public))
    // .pipe(livereload());
  return stream;
});



gulp.task('html', () => {
  return gulp.src(paths.html)
    // .pipe(sourcemaps.init())
    // .pipe(htmlmin({
    //   collapseWhitespace: true
    // }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public))
    // .pipe(livereload());
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public))
    // .pipe(livereload());
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

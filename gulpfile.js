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
    path       = require('path');

const paths = {
  scripts:  ['src/public/**/*.js'],
  stylus:   ['src/public/**/*.styl'],
  html:     ['src/public/**/*.html'],
  public:   'build/public',
  server: {
    src:    ['src/server/**/*.js'],
    build:  'build/server'
  }
};

const extensions = 'html js styl';

gulp.task('default', ['scripts', 'html', 'stylus', 'server']);

gulp.task('dev', function () {
  nodemon({
    script: './build/server/server.js'
    , env: {'NODE_ENV': 'development'}
    , ext: extensions
    , tasks: (changedFiles) => {
      return changedFiles.filter((file) => {
        const tasks = [];
        console.log('file ==', file, '\ndirname ==', path.dirname(file));
        if (path.extname(file) === '.js') {
          if (path.dirname(file).includes('src/server') && !~tasks.indexOf('server')) {
            tasks.push('server');
          } else if (!~tasks.indexOf('scripts')) {
            tasks.push('scripts')
          }
        }
        if (path.extname(file) === '.styl' && !~tasks.indexOf('stylus')) tasks.push('stylus');
        if (path.extname(file) === '.html' && !~tasks.indexOf('html')) tasks.push('html');
      });
    }
  })
});

gulp.task('scripts', () => {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
});

gulp.task('html', () => {
  return gulp.src(paths.html)
    .pipe(sourcemaps.init())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
});

gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
});

gulp.task('server', () => {
  return gulp.src(paths.server.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.server.build))
  });

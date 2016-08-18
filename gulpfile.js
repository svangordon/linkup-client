var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    jshint      = require('gulp-jshint')
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    data        = require('gulp-data'),
    stylus      = require('gulp-stylus'),
    htmlmin  = require('gulp-htmlmin');

const paths = {
  scripts:  ['src/public/**/*.js'],
  stylus:   ['src/public/**/*.styl'],
  html:     ['src/public/**/*.html'],
  public:   'build/public',
  server: {
    src:    ['src/server/**/*.js'],
    build:  'build/server'
  }
}

gulp.task('default', ['scripts', 'html', 'stylus', 'server']);

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

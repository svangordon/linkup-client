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
    Cache       = require('gulp-file-cache');

const cache = new Cache();

const paths = {
  scripts:  ['src/public/**/*.js'],
  stylus:   ['src/public/**/*.styl'],
  html:     ['src/public/**/*.html'],
  public:   'dist/public',
  server: {
    src:    ['src/server/**/*.js'],
    dist:  'dist/server'
  }
};

const extensions = 'html js styl';

gulp.task('default', ['dev', 'scripts', 'html', 'stylus', 'server', 'clean']);

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('dev', ['scripts', 'html', 'stylus', 'server', 'clean'], () => {
  return stream = nodemon({
    script: './dist/server/server.js'
    , env: {'NODE_ENV': 'development'}
    , ext: extensions
    , watch: 'src'
    , tasks: (changedFiles) => {
      return changedFiles.filter((file) => {
        const tasks = [];
        // console.log('file ==', file, '\ndirname ==', path.dirname(file));
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
  });
  return stream;
});

gulp.task('scripts', ['clean'], () => {
  const stream = gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
  return stream;
});

gulp.task('html', ['clean'], () => {
  return gulp.src(paths.html)
    .pipe(sourcemaps.init())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
});

gulp.task('stylus', ['clean'], () => {
  return gulp.src(paths.stylus)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
});

gulp.task('server', ['clean'], () => {
  const stream = gulp.src(paths.server.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.server.dist))
  return stream;
});

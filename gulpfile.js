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

gulp.task('default', ['clean'], () => {
  gulp.start('dev')
});

gulp.task('clean', (cb) => {
  console.log('clean fired')
  return del(['dist']);
});

gulp.task('build-all', ['clean'], () => {
  gulp.start('scripts', 'html', 'stylus', 'server');
});

gulp.task('dev', ['build-all', 'server'], () => {
  livereload.listen();
  return stream = nodemon({
    script: './dist/server/server.js'
    , env: {'NODE_ENV': 'development'}
    , ext: extensions
    , watch: 'src'
    , tasks: ['build-all']/*(changedFiles) => {
      return changedFiles.filter((file) => {
        console.log('file ==', file);
        const tasks = [];
        if (path.extname(file) === '.js') {
          if (path.dirname(file).includes('src/server') && !~tasks.indexOf('server')) {
            tasks.push('server');
          } else if (!~tasks.indexOf('scripts')) {
            tasks.push('scripts')
          }
        }
        if (path.extname(file) === '.styl' && !~tasks.indexOf('stylus')) tasks.push('stylus');
        if (path.extname(file) === '.html' && !~tasks.indexOf('html')){
          tasks.push('html');
          console.log('tasks ==', tasks)
        };
      });
    }*/
  });
  return stream;
});

gulp.task('scripts', () => {
  const stream = gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(cache.filter())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(cache.cache())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public));
  return stream;
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
    // .pipe(cache.filter())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    // .pipe(cache.cache())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.server.dist))
  return stream;
});

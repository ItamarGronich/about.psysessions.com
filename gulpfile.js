const
  gulp        = require('gulp'),
  less        = require('gulp-less'),
  browserSync = require('browser-sync'),
  sourceMaps  = require('gulp-sourcemaps'),
  minCss      = require('gulp-clean-css'),
  plumber     = require('gulp-plumber'),
  browserify  = require('browserify'),
  babelify    = require('babelify'),
  source      = require('vinyl-source-stream'),
  gutil       = require('gulp-util'),
  buffer      = require('vinyl-buffer'),
  uglify      = require('gulp-uglify'),
  ghPages     = require('gulp-gh-pages'),
  inline      = require('gulp-inline-source'),
  htmlMin     = require('gulp-htmlmin'),
  revAll      = require('gulp-rev-all'),
  del         = require('del'),
  rename      = require('gulp-rename');

  // Paths to the different sources and destinations.
  sources = {
    styles: 'src/styles',
    js: 'src/js/',
    html: 'src/index.html',
    assets: 'img/pageAssets/',
    dist: 'dist/',
    build: 'build/'
  };

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify
// handle es6 including imports.
gulp.task('es6', function() {
  return browserify({
    entries: sources.js + 'main.js',
    debug: true
  })
    .transform("babelify", { presets: ['es2015'] })
    .on('error',gutil.log)
    .bundle()
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .on('error',gutil.log)
    .pipe(buffer())
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(sources.dist));
});

// Styles.
gulp.task('less', function () {
  return gulp.src(sources.styles + '/style.less')
    .pipe(sourceMaps.init())
    .pipe(plumber())
    .pipe(less())
    .pipe(minCss())
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(sources.dist))
    .pipe(browserSync.stream());
});

// Assets.
gulp.task('assets', function () {
  return gulp.src([sources.assets + '**/*.png', sources.assets + '**/*.ico'])
    .pipe(gulp.dest(sources.dist))
});

// HTML.
gulp.task('html', function () {
  return gulp.src(sources.html)
    .pipe(gulp.dest(sources.dist))
});

// Transpile, Compress and copy all sources to dist folder.
gulp.task('build', ['less', 'html', 'assets', 'es6']);

// Static Server + watching less/html files
gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/js/**/*.js",['es6']).on('change', browserSync.reload);
  gulp.watch("src/styles/*.less", ['less']);
  gulp.watch("src/index.html", ['html']).on('change', browserSync.reload);
  gulp.watch(sources.assets + '**/*.*', ['assets'])
});

// Default task.
gulp.task('default', ['serve']);

gulp.task('bundle-all', ['build', 'clean:build'],
  () =>
    gulp
      .src(sources.dist + 'index.html')
      .pipe(plumber())
      .pipe(inline())
      .pipe(htmlMin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        preventAttributesEscaping: true,
        removeComments: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true
      }))
      .pipe(revAll.revision())
      .pipe(plumber.stop())
      .pipe(gulp.dest(sources.build))
);

// Clean build directory.
gulp.task('clean:build', () => del(sources.build + '**/*.*'));

gulp.task('deploy:gh-pages', ['bundle-all'],
  () =>
    gulp.src(sources.build + '/*.html')
      .pipe(rename('index.html'))
      .pipe(ghPages())
);

const
	gulp = require('gulp'),
  less = require('gulp-less'),
  browserSync = require('browser-sync'),
  sourceMaps = require('gulp-sourcemaps'),
  minCss = require('gulp-clean-css'),

  // Paths to the different sources and destinations.
  sources = {
    styles: 'src/styles',
    html: 'src/index.html',
    assets: 'assets/',
    dist: 'dist/'
  };

// Styles
gulp.task('less', function () {
  return gulp.src(sources.styles + '/style.less')
    .pipe(sourceMaps.init())
    .pipe(less())
    .pipe(minCss())
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest(sources.dist))
    .pipe(browserSync.stream());
});

// HTML
gulp.task('html', ['less'], function () {
  return gulp.src(sources.html)
    .pipe(gulp.dest(sources.dist))
});

// Static Server + watching less/html files
gulp.task('serve', ['less', 'html'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/styles/*.less", ['less']);
  gulp.watch("src/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
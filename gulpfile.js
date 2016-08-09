'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var babelify = require('babelify');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('default', ['less', 'compile-js']);
gulp.task('dist', ['minify-js', 'minify-css', 'copy']);

gulp.task('less', function() {
  return gulp.src('web/dev/less/main.less')
  .pipe(less())
  .pipe(gulp.dest('web/build/css'));
});

gulp.task('compile-js', function() {
  return gulp.src('web/dev/js/main.js')
  .pipe(browserify({
    transform: [babelify.configure({presets: ['es2015','react']})]
  }))
  .pipe(gulp.dest('web/build/js'));
});

gulp.task('minify-js', ['compile-js'], function() {
  return gulp.src('web/build/js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('web/dist/js'));
});

gulp.task('minify-css', ['less'], function() {
  return gulp.src('web/build/css/main.css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('web/dist/css'));
});

gulp.task('copy', ['bootstrap', 'jquery', 'img', 'html']);

gulp.task('bootstrap', function() {
  return gulp.src([
    'node_modules/bootstrap/dist/**/*',
    '!**/npm.js',
    '!**/bootstrap-theme.*',
    '!**/*.map'
  ])
  .pipe(gulp.dest('web/dist/vendor/bootstrap'));
});

gulp.task('jquery', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest('web/dist/vendor/jquery'));
});

gulp.task('img', function () {
  return gulp.src('web/dev/img/**')
  .pipe(gulp.dest('web/dist/img'));
});

gulp.task('html', function () {
  return gulp.src('web/dev/html/index.html')
  .pipe(gulp.dest('web/dist'));
});

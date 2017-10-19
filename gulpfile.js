'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var csswring = require('csswring');
var cssnext = require('cssnext');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var	newer = require('gulp-newer');

// D E V E L O P M E N T ---------------------------------------------

gulp.task('sass', function() {
	return gulp.src('./app/sass/**/*.scss')
	.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./app'));
});

gulp.task('scripts', function() {
  return gulp.src(['./app/js/vendors/jquery.js', './app/js/vendors/enquire.js', './app/js/vendors/slick.js', './app/js/script.dev.js'])
  	.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function() {
	gulp.watch('./app/**/*.scss', ['sass']);
	gulp.watch('./app/**/*.js', ['scripts']);
});

// P R O D U C T I O N -----------------------------------------------
 
 gulp.task('minify', function() {
  return gulp.src('./app/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
	var processors = [
		csswring,
		autoprefixer({
			browsers: ['last 2 version']
		}),
		// cssnext({})
	];

	return gulp.src('./app/styles.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./dist'));
});


gulp.task('compress', function (cb) {
  pump([
        gulp.src('./app/js/script.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

// move Fonts files to prod enviroment
gulp.task('fonts', () => {
  return gulp.src('./app/fonts/**/*')
    .pipe(newer('./dist/fonts/'))
    .pipe(gulp.dest('./dist/fonts/'));
});

// image processing to prod enviroment
gulp.task('images', () => {
  return gulp.src('./app/images/**/*')
    .pipe(newer('./dist/images/'))
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('build', ['minify', 'styles', 'compress', 'fonts', 'images'], function() {
	console.log('Good job my friend!');
});



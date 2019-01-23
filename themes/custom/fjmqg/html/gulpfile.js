'use strict';

var gulp        = require('gulp'),
		browserSync = require('browser-sync').create(),
		sass        = require('gulp-sass'),
		sourcemaps  = require('gulp-sourcemaps'),
		cssnano     = require('gulp-cssnano'),
		concat      = require('gulp-concat'),
		gcmq        = require('gulp-group-css-media-queries'),
		uglify      = require('gulp-uglify'),
		template    = require('gulp-template-html'),
		browserify  = require('browserify'),
		source      = require('vinyl-source-stream');

// let the magic begin

// Static Server + watching scss/html files
gulp.task('serve', ['pages', 'sass', 'scripts'], function() {
	browserSync.init({
		open: false,
		server: "./build"
	});
	gulp.watch('./sass/**/*.sass', ['sass']);
	gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./build/js/scripts.js').on('change', browserSync.reload);
	gulp.watch('./pages/*.html', ['pages']);
	gulp.watch('./build/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src('./sass/main.sass')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(gcmq())
		// .pipe(cssnano())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
});

//browserify file
// gulp.task('scripts', function() {
// 	return browserify('./js/custom.js')
// 		.bundle()
// 		.pipe(source('scripts.js'))
// 		.pipe(gulp.dest('./build/js'));
// });

// js tasks
gulp.task('scripts', function() {
	return gulp.src(['!./node_modules/jquery/dist/jquery.js','./node_modules/slick-carousel/slick/slick.js', './js/jquery.dd.js', './js/multicheckbox.js/', './js/custom.js'], { base: 'js' })
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		// .pipe(uglify())
		.pipe(gulp.dest("./build/js"))
		.pipe(sourcemaps.write('./js/maps'));
});

// html templates
gulp.task('pages', function () {
	return gulp.src('./pages/*.html')
		.pipe(template('./pages_template/_template.html'))
		.pipe(gulp.dest('./build'));
});

// build
gulp.task('build', ['pages', 'sass', 'scripts'], function() {});
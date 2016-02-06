// Modules 호출
var gulp = require('gulp');
var csslint = require('gulp-csslint');
var concatcss = require('gulp-concat-css');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var del = require('del');
var config = require('./config.json');

/***********************
	* CSS
	* 문법 검사 > 병합 > 압축
************************/
gulp.task('styles', function() {
	gulp.src(config.path.css.src)
	  .pipe(csslint( { 'import': false } ))   	// 문법검사
	  .pipe(csslint.reporter())				
	  .pipe(concatcss(config.path.css.filename))	// css 병합
	  .pipe(gulp.dest(config.path.css.dest))
	  .pipe(uglifycss())						// css 압축
	  .pipe(rename({ suffix: '.min' }))
	  .pipe(gulp.dest(config.path.css.dest));
});

/***********************
	* Javascript
	* 문법 검사 > 병합 > 압축
************************/

gulp.task('scripts', ['js:hint', 'js:compress']);

// js 문법 검사
gulp.task('js:hint', function() {
    gulp.src(config.path.js.src)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// js 병합 && 압축
gulp.task('js:compress', function() {
    gulp.src(config.path.js.src)
      .pipe(concat(config.path.js.filename))
      .pipe(gulp.dest(config.path.js.dest))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.path.js.dest));
});

/************************
	* 폴더 / 파일 제거
************************/
gulp.task('clean', function() {
	del(['dist/*']);
});

/************************
	* 지속적 감시 (Watch)
************************/
gulp.task('watch', ['clean'], function() {
	gulp.watch(config.path.css.src, ['styles']);
	gulp.watch(config.path.js.src, ['scripts']);
});


/* default 설정 */
gulp.task('default', ['clean', 'styles', 'scripts', 'watch']);



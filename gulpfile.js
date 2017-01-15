var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var del = require('del');

gulp.task('build:del', function(){
	del(['views/dist']);
});

gulp.task('scripts', function(){
	gulp.src([
		'views/layouts/dist/js/customScript.js', 
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/aos/dist/aos.js',
	])
	.pipe(gulp.dest('views/dist/js'));
	
});

gulp.task('css', function(){
	gulp.src([
		'views/layouts/dist/css/customStyle.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/font-awesome-min/css/font-awesome.min.css',
		'bower_components/animate.css/animate.css',
		'bower_components/aos/dist/aos.css',
	])
	.pipe(minifyCSS())
	.pipe(gulp.dest('views/dist/css'));
	
});

gulp.task('fonts', function(){
	gulp.src([
		'bower_components/font-awesome-min/fonts/*.woff',
		'bower_components/font-awesome-min/fonts/*.woff2',
		'bower_components/font-awesome-min/fonts/*.ttf',
	])
	.pipe(gulp.dest('views/dist/fonts'));
	
});

gulp.task('default', ['build:del', 'scripts', 'css', 'fonts']);
/////////////////////////////////////////////////
// to watch changing
// gulp.task('watch', function(){
// 	gulp.watch('views/dist/js/*.js', ['scripts']);
// 	gulp.watch('views/dist/css/*.css', ['css']);
// });
// gulp.task('default', ['scripts', 'css', 'watch']);
/////////////////////////////////////////////////

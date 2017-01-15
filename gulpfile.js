var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var minifyCSS = require('gulp-minify-css');

gulp.task('scripts', function(){
	gulp.src(['views/layouts/dist/js/customScript.js'])
	.pipe(babel({
        presets: ['es2015']
    }))
	.pipe(uglify())
	.pipe(gulp.dest('views/dist/js'));
	
});

gulp.task('css', function(){
	gulp.src(['views/layouts/dist/css/customStyle.css'])
	.pipe(minifyCSS())
	.pipe(gulp.dest('views/dist/css'));
	
});

gulp.task('watch', function(){
	
	gulp.watch('views/dist/js/*.js', ['scripts']);
	gulp.watch('views/dist/css/*.css', ['css']);

});

gulp.task('default', ['scripts', 'css', 'watch']);
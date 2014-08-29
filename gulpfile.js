var gulp = require('gulp');
var ts = require('gulp-type');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var del = require('del');
var notify = require("gulp-notify");
var concat = require("gulp-concat");

var root = '../src';
var build = '../build';

var paths = {
	scripts: 		root + '/script/lib/**/*.js',
	typescripts: 	root + '/script/**/*.ts',
	images: 		root +'/images/**/*',
	styles : 		root + '/style/main.scss'
};

gulp.task('clean', function(cb)
{
	del([build + '/style', build + '/script', build + '/images'], {force : true}, cb);
});


gulp.task('images', function()
{
	return gulp.src(paths.images)
		// Pass in options to the task
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(build + '/images'))
		.pipe(notify("Image task completed"));
});

gulp.task('typescript', function()
{
	return gulp.src(paths.typescripts)
		.pipe(ts({
			declarationFiles: true,
			noExternalResolve: true
		}))
		.pipe(gulp.dest(root + '/_temp'));
});

gulp.task('scripts', function()
{
	gulp.src(paths.scripts)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(build + '/script/'))
})

gulp.task('styles', function()
{
	return gulp.src(paths.styles)
		// Pass in options to the task
		.pipe(sass())
		.pipe(gulp.dest(build + '/style'))
		.pipe(notify("Sass task completed"));
});


gulp.task('watch', function()
{
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch', 'images', 'styles', 'typescript', 'scripts']);

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./*.scss")
		.pipe(autoprefixer())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
        .pipe(gulp.dest('./'))
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./*.scss", gulp.series('sass')).on('change', browserSync.reload);
	gulp.watch("./*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("./*/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
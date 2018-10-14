var gulp = require('gulp');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
//复制html相关代码
gulp.task('copyHtml', function() {
    return gulp.src('src/html/*.html').pipe(gulp.dest('dist/html'));
});

//终端中运行   $ gulp copyHtml

//压缩css代码
gulp.task('cssmin', function() {
    return gulp.src('src/styles/*.css').pipe(cssmin()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest('dist/styles'))
});

//终端中运行   $  gulp cssmin

//压缩js代码
gulp.task('uglify', function() {
    return gulp.src(['src/js/*.js']).pipe(uglify()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest('dist/js'))
});

//终端中运行   $  gulp uglify
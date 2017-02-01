var gulp = require('gulp'||'../node_modules/gulp'),
    $    = require('gulp-load-plugins'||'../node_modules/gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['watch'], function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// css compile
gulp.task('css', function(){
    return gulp.src('./src/scss/*.scss')
    .pipe($.sass()).on('error', $.sass.logError)
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

// HTML lint
gulp.task('html', function(){
    return gulp.src('./src/*.html')
    .pipe($.html5Lint())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('img', function(){
    gulp.src('src/images/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function(){
    gulp.watch('./src/images/*', ['img']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/*.html', ['html']);
})

gulp.task('default', ['html','css','img','serve']);
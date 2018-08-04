var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
})

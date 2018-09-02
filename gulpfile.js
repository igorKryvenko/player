var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename =require('gulp-rename'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

gulp.task('icons', function() {
  return gulp.src('./node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./app/fonts'));
});

gulp.task('sass', ['icons'], function() {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({stream: true}))
});

// gulp.task('scripts', function() {
//   return gulp.src([
//     'app/libs/jquery/dist/jquery.min.js',
//     'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
//   ])
//   .pipe(concat('libs.min.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('app/js'));
// });

gulp.task('scripts', function () {
  return gulp.src('./app/js/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      externals: {
        jquery: 'jQuery'
      }
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('minify-css',['sass'],  function() {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'minify-css', 'scripts'], function() {
  gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
});

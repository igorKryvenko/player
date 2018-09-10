var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename =require('gulp-rename'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('icons', function() {
  return gulp.src('./node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('sass', ['icons'], function() {
  return gulp.src('./src/sass/main.scss')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.css'
      },
      module: {
        rules: [
          { // sass / scss loader for webpack
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          },
        ]
      },
      plugins: [
        new ExtractTextPlugin({
          filename: './[name].bundle.css',
          allChunks: true
        })
      ]
    }))
    .pipe(gulp.dest('./dist/'))
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
  return gulp.src('./src/js/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js',
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
    .pipe(gulp.dest('./dist/'))
    // .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css',['sass'],  function() {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'minify-css', 'scripts'], function() {
  gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('app/js/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    notify: false
  })
});

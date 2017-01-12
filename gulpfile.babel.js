const gulp = require('gulp')
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const reload = browserSync.reload

gulp.task('styles', function () {
  return gulp.src('assets/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.stream())
})

gulp.task('scripts', function () {
  return browserify({
      entries: 'assets/js/scripts.js'
    })
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(gulp.dest('assets/js/dist'))
    .pipe(browserSync.stream())
})

gulp.task('browsersync', function() {
  browserSync({
    port: 4201,
    serveStatic: ['./assets'],
    proxy: {
      target: 'http://demo1.xlocal.com',
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false,
          'browsersyncblok': true
        }
      }
    },
    reloadDelay: 1000,
    notify: true,
    open: true,
    logLevel: 'silent'
  })

  gulp.watch('assets/scss/**/*.scss', ['styles'])
  gulp.watch('assets/js/**/*.js', ['scripts'])
})

gulp.task('default', ['styles', 'scripts', 'browsersync'])

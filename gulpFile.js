const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => gulp
  .src('./src/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest(file => `${file.base}`))
  .pipe(browserSync.stream()));

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

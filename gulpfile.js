var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);

var fontName = 'icons';
var cssClass = '';

gulp.task('iconfont', function(){
  gulp.src(['assets/svgs/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      cssClass: cssClass
    }))
    .pipe(iconfont({
      fontName: fontName, // required
      appendUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
     }))
    .pipe(gulp.dest('assets/fonts/'));
});

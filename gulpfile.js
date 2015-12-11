var gulp = require("gulp");
var rename = require("gulp-rename");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var fontName = 'icons'; // set name of your symbol font
var template = 'fontawesome-style'; // you can also choose 'foundation-style'

gulp.task('svgtoicons', function(){
  gulp.src('assets/svgs/*.svg') // you can also choose 'symbol-font-16px.sketch'
    .pipe(iconfont({ fontName: fontName, normalize: true }))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
        }),
        fontName: fontName,
        fontPath: '', // set path to font (from your CSS file if relative)
        className: '' // set class name in your CSS
      };
      gulp.src('assets/templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/css/')); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src('assets/templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest('dist/')); // set path to export your sample HTML
    })
    .pipe(gulp.dest('dist/fonts/')); // set path to export your fonts
});

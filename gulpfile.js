const gulp   = require("gulp");
const csso   = require('gulp-csso');
const minify = require('gulp-minify');
const webp   = require('gulp-webp');

const css_src = "./public/css-dev/style.css";
const js_src  = "./public/js-dev/main.js";

gulp.task("default", listen);
gulp.task("mincss", minCSS);
gulp.task('minjs', minJS);
gulp.task('webp', cnvwebp);

function minCSS(){
    return gulp
        .src(css_src)
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./public/css'));
}
function minJS(){
   return gulp.src([js_src])
      .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
      .pipe(gulp.dest('./public/js'));    
}
function cnvwebp(){
    return gulp.src('./public/images/*.{svg,png}')
        .pipe(webp())
        .pipe(gulp.dest('./public/images'))
}
function listen(){
  gulp.watch(css_src, minCSS);
  gulp.watch(js_src, minJS);
}
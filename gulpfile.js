const gulp = require("gulp");
const { src, dest } = require("gulp")

//images
    const imagemin = require('gulp-imagemin');
    function imgMinify(){
        return gulp.src('project/photos/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
    }
    exports.img = imgMinify


//html
const htmlmin = require('gulp-htmlmin')
function copyHtml() {
    return src('project/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}
exports.html = copyHtml

//css
var cleanCss = require('gulp-clean-css');
var conc = require('gulp-concat')
function cssMinify() {
    return src("project/css/bootstrap-5.1.3-dist/**/*.css")
        //concate all css files in style.min.css
        .pipe(conc('style.min.css'))
        //minify file 
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
exports.css = cssMinify

//js

const terser = require('gulp-terser');

function jsMinify() {
    return src('project/js/**/*.js',{sourcemaps:true}) //path includeing all js files in all folders
    
        //concate all js files in all.min.js
        .pipe(conc('all.min.js'))
        //use terser to minify js files
        .pipe(terser())
        //create source map file in the same directory
        .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
}
exports.js = jsMinify




///browser sync

var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}
function reloadTask(done) {
    browserSync.reload()
    done()
  }
  //watch task
function watchTask() {
    watch('project/*.html',series(copyHtml, reloadTask))
    watch('project/js/**/*.js',series(jsMinify, reloadTask))
    watch(["project/css/**/*.css","project/sass/**/*.scss" ], parallel(reloadTask));
}
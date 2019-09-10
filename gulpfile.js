const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cleanCSS    = require('gulp-clean-css');
const rename      = require('gulp-rename');
const purgecss    = require('gulp-purgecss');

// Compile SASS into CSS & autoinject into browser
function compileSass() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        /*.pipe(purgecss({
            content: ['./dist/!*.html']
        }))*/
        .pipe(gulp.dest("./src/css"))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
}

function compileCSS() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(purgecss({
            content: ['./src/*.html']
        }))
        .pipe(gulp.dest("./src/css"))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./src/css"))
}

// Move Javascript files into our /src/js folder
function copyJS() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
}

// Static Server + watching scss/html files
function serve() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch('./src/scss/**/*.scss', compileSass);
    gulp.watch(['./dist/*.html', './src/css/style.css', './dest/js/*.js']).on('change', browserSync.reload);
}

exports.default = gulp.parallel(serve);

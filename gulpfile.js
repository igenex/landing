const gulp = require('gulp'),
      bs = require('browser-sync'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      spritesmith = require('gulp.spritesmith'),
      rimraf = require('rimraf');



//npm i gulpjs/gulp#4.0 -D
/* ------------------------- Server ------------------------- */

gulp.task('server', function () {
    bs.init({
        server : {
            port:3003,
            baseDir: "./build"
        }
    });
    gulp.watch('build/**/*').on('change', bs.reload);
});



/* ------------------------- PUG ------------------------- */

gulp.task('pug', function buildHTML () {
   return gulp.src('source/template/index.pug')
       .pipe(pug({
           pretty: true
       }))
       .pipe(gulp.dest('build'));
});

/* ------------------------- Sass ------------------------- */

gulp.task('sass', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass())
        .pipe(cssnano()).pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

/* ------------------------- Sprite ------------------------- */

gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../images/sprite.png',
            cssName: 'sprite.scss'
        }));

    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global'));
    cb();
});

/* ------------------------- clean ------------------------- */
/*
gulp.task('clean', function () {
    return del.sync(['build/!**', '!build']);
});*/
gulp.task('clean', function (cb) {
    return rimraf('build', cb);
});

/* ------------------------- Copy Fonts ------------------------- */
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------------------- Copy images ------------------------- */
gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------------------- Copy ------------------------- */

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ------------------------- Watchers ------------------------- */

gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('pug'));
    gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
});

/* ------------------------- Defaults ------------------------- */
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));

/* ------------------------- Build ------------------------- */
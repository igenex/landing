const gulp = require("gulp"),
      browserSync = require('browser-sync').create(),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      rimraf = require('rimraf'),
      sprite = require('gulp-spritesmith'),
      gulpif = require('gulp-if'),
      rename = require('gulp-rename'),
      autoprefixer = require('gulp-autoprefixer');


/*------------------Browser Sync Server ---------------*/
gulp.task('server', () => {
    "use strict";
    browserSync.init({
        server : {
            port: 9000,
            baseDir: "build"
        }
    });
});

/* ------------------------- Styles ------------------------- */

gulp.task('sass', function () {
   return gulp.src('source/styles/main.scss')
       .pipe(sass({
           outputStyle: 'compressed'
       }).on('error', sass.logError))
       .pipe(rename('main.min.css'))
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
       .pipe(gulp.dest('./build/css'))
});

/* ------------------------- Спрайты ------------------------- */

/*
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/!*.png')
        .pipe(spritesmith({
            imgName: 'sprite,png',
            imgPath: '../images/sprite.png',
            cssName: 'sprite.scss'
        }));

    spriteData.img.pipe(gulp.dest('build/images'));
    spriteData.css.pipe(gulp.dest('build/styles/global'));
    cb();
});
*/

/*
gulp.task('sprite', function () {
    return  gulp.src('source/images/icons/!*.png')
        .pipe(tasks.sprite({
            imgName: 'sprite.png',
            styleName: 'sprite.scss',
            imgPath: '../images/sprite.png'
        }))
        .pipe(gulpif('*.png', gulp.dest('./build/images')))
        .pipe(gulpif('*.css', gulp.dest('./build/styles/global')));
});*/
/* ------------------------- Copy fonts & images ------------------------- */

gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------------------- Copy all ------------------------- */

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ------------------------- Delete ------------------------- */

gulp.task('clean', function del (cb) {
    return rimraf('build', cb);
});


gulp.task('pug', function buildHTML () {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});
/* ------------------------- Gulp watchers ------------------------- */

gulp.task('watch', function () {
    gulp.watch('source/template/**/*.pug', gulp.series('pug'));
    gulp.watch('source/styles/**/*.scss', gulp.series('sass'));
    gulp.watch('./build/**/*').on('change', browserSync.reload);
});


/* ------------------------- gulp default ------------------------- */

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'copy'),
    gulp.parallel('watch', 'server')
));
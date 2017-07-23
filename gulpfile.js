// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-html');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/app'
        },
    })
});

gulp.task('build:html', function () {
   return gulp.src('app/templates/**/*.html')
       .pipe(nunjucks({searchPaths: ['app/templates/'], locals: {
           works: {
               items: [
                   {
                       title: 'Play with no limits.',
                       image: 'images/slide1.jpg',
                   },
                   {
                       title: 'Play with no limits.',
                       image: 'images/slide1.jpg',
                   },
                   {
                       title: 'Play with no limits.',
                       image: 'images/slide1.jpg',
                   },
                   {
                       title: 'Play with no limits.',
                       image: 'images/slide1.jpg',
                   }
               ]
           },
           carousel: {
               slides: [
                   {
                        image: 'images/slide1.jpg',
                        title : 'Play with <span class="text-yellow">no limits</span>.',
                        description: 'How we created the largest russian CS:GO gaming service.',
                        href: '#',
                        email: 'hello@blackur.com'
                   },
                   {
                       image: 'images/slide1.jpg',
                       title : 'Play with <span class="text-yellow">no limits</span>.',
                       description: 'How we created the largest russian CS:GO gaming service.',
                       href: '#',
                       email: 'hello@blackur.com'
                   },
                   {
                       image: 'images/slide1.jpg',
                       title : 'Play with <span class="text-yellow">no limits</span>.',
                       description: 'How we created the largest russian CS:GO gaming service.',
                       href: '#',
                       email: 'hello@blackur.com'
                   },
                   {
                       image: 'images/slide1.jpg',
                       title : 'Play with <span class="text-yellow">no limits</span>.',
                       description: 'How we created the largest russian CS:GO gaming service.',
                       href: '#',
                       email: 'hello@blackur.com'
                   }
               ]
           }
       }}))
       .pipe(gulp.dest('./dist/app'));
});

gulp.task('build:js', function (cb) {
    return gulp.src(['node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/aos/dist/*.js',
        'app/scripts/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/app'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build:scss', function () {
   return gulp.src(['node_modules/flexboxgrid/css/*.css', 'app/styles/**/*.scss', 'node_modules/aos/dist/*.css'])
       .pipe(concat('app.scss'))
       .pipe(sass.sync().on('error', sass.logError))
       .pipe(gulp.dest('./dist/app'))
       .pipe(browserSync.reload({
           stream: true
       }));
});

gulp.task('build:img', function () {
    return gulp.src(['app/images/**/*.*'])
        .pipe(gulp.dest('./dist/app/images'));
});

gulp.task('build:fonts', function () {
    return gulp.src(['app/fonts/**/*.*'])
        .pipe(gulp.dest('./dist/app/fonts'));
});

gulp.task('server', ['build:scss', 'build:js', 'build:img', 'build:html', 'build:fonts', 'browserSync'], function () {

    gulp.watch(['app/**/*.html'], ['build:html'], browserSync.reload);
    gulp.watch(['app/styles/**/*.scss'], ['build:scss']);
    gulp.watch(['app/scripts/**/*.js'], ['build:js']);
    gulp.watch(['app/images/**/*'],['build:img'], browserSync.reload);
});
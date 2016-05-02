var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var changed = require('gulp-changed');
var rename = require("gulp-rename");
var imageResize = require("gulp-image-resize");
var gm = require('gulp-gm');
var less = require("gulp-less");

gulp.task('default',['less', 'icons', 'watch'], function()
{

});

gulp.task('less', function()
{
   gulp.src('./less/site.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(gulp.dest('./css'));
});

//Path to your original icon image (should be 194px by 194px or larger)
var htmlIconSrc = './images/icons/favicon-original.png';
var appleIconSrc = './images/icons/favicon-original.png';
var androidIconSrc = './images/icons/favicon-original.png';
var windowsIconSrc = './images/icons/favicon-original.png';

gulp.task('watch', function() {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch(htmlIconSrc, ['icons']);
  gulp.watch(appleIconSrc, ['icons']);
  gulp.watch(androidIconSrc, ['icons']);
  gulp.watch(windowsIconSrc, ['icons']);
});

gulp.task('icons', function()
{
    //Set to true if use imageMagick, false if using graphicsMagick
    var imageMagick = true;

    //Sizes outputted
    var htmlArr = [194, 96, 32, 16];
    var appleArr = [180, 152, 144, 120, 114, 76, 72, 60, 57];
    var androidArr = [192, 144, 96, 72, 48, 36];
    var windowsArr = [144];

    //Generate favicon.ico in the index.html folder
    gulp.src(htmlIconSrc)
          .pipe(imageResize({
              imageMagick: imageMagick,
              width : 16,
              height : 16,
              crop : true,
              gravity: 'center',
              upscale : false,
              filter: 'Catrom'
          }))
          .pipe(gm(function (gmfile) {
                return gmfile.setFormat('ico');
          }, {
            imageMagick: imageMagick
          }))
          .pipe(rename({
            //dirname: "",
            basename: "favicon",
            //prefix: "",
            //suffix: "-"+size+"x"+size,
            extname: ".ico"
          }))
          .pipe(gulp.dest('.'));


    for(size of htmlArr)
    {
        gulp.src(htmlIconSrc)
          .pipe(imageResize({
              imageMagick: imageMagick,
              width : size,
              height : size,
              crop : true,
              gravity: 'center',
              upscale : false,
              format: 'png',
              filter: 'Catrom'
          }))
          .pipe(rename({
            //dirname: "",
            basename: "favicon",
            //prefix: "",
            suffix: "-"+size+"x"+size,
            extname: ".png"
          }))
          .pipe(gulp.dest('./images/icons'));
    }

    for(size of appleArr)
    {
        gulp.src(appleIconSrc)
          .pipe(imageResize({
              imageMagick: imageMagick,
              width : size,
              height : size,
              crop : true,
              gravity: 'center',
              upscale : false,
              format: 'png',
              filter: 'Catrom'
          }))
          .pipe(rename({
            //dirname: "",
            basename: "apple-touch-icon",
            //prefix: "",
            suffix: "-"+size+"x"+size,
            extname: ".png"
          }))
          .pipe(gulp.dest('./images/icons'));
    }

    for(size of androidArr)
    {
        gulp.src(androidIconSrc)
          .pipe(imageResize({
              imageMagick: imageMagick,
              width : size,
              height : size,
              crop : true,
              gravity: 'center',
              upscale : false,
              format: 'png',
              filter: 'Catrom'
          }))
          .pipe(rename({
            //dirname: "",
            basename: "android-chrome",
            //prefix: "",
            suffix: "-"+size+"x"+size,
            extname: ".png"
          }))
          .pipe(gulp.dest('./images/icons'));
    }

    for(size of windowsArr)
    {
        gulp.src(windowsIconSrc)
          .pipe(imageResize({
              imageMagick: imageMagick,
              width : size,
              height : size,
              crop : true,
              gravity: 'center',
              upscale : false,
              format: 'png',
              filter: 'Catrom'
          }))
          .pipe(rename({
            //dirname: "",
            basename: "mstile",
            //prefix: "",
            suffix: "-"+size+"x"+size,
            extname: ".png"
          }))
          .pipe(gulp.dest('./images/icons'));
    }

});

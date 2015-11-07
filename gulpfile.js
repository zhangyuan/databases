var gulp = require("gulp"),
  connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  babel = require('gulp-babel'),
  htmlreplace = require('gulp-html-replace');

gulp.task('develop', function(){
  return connect.server({
    root: ['src']
  })
});

gulp.task('run', function(){
  return connect.server({
    root: ['.']
  })
});

gulp.task('html', function(){
  return gulp.src(["src/*.html"])
    .pipe(htmlreplace({
      'js' : 'javascripts/libs.js',
      'css':'stylesheets/application.css',
      'babel' : 'javascripts/application.js'
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('jsLibs', function(){
  return gulp.src(["src/javascripts/libs/react.min.js", "src/javascripts/libs/react-dom.min.js", "src/javascripts/libs/jquery-2.1.4.min.js", "src/javascripts/libs/lunr.min.js"])
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(gulp.dest("javascripts"));
});

gulp.task('js', function(){
  return gulp.src(["src/javascripts/app/**/*.js"])
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(gulp.dest("javascripts"))
});

gulp.task('css', function(){
  return gulp.src(["src/stylesheets/**/*.css"])
    .pipe(concat('application.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest("stylesheets"))
});

gulp.task('api', function(){
  return gulp.src(["src/api/**/*"])
    .pipe(gulp.dest("api"))
});

gulp.task('default', ['html', 'js', 'css', 'jsLibs', 'api']);
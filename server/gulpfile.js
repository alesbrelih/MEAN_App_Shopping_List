var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");


var angularFiles = ["client/app/**/*.js"];
var scriptDependencies = ["client/bower_components/angular/angular.min.js",
"client/bower_components/angular-resource/angular-resource.js",
"client/bower_components/angular-ui-router/release/angular-ui-router.min.js"];

gulp.task ("script-dependencies",function(){
    gulp.src(scriptDependencies)
    .pipe(concat("script-dependencies.min.js"))
    .pipe(gulp.dest("client/dist/js"))
});

gulp.task("angular-scripts",function(){
    gulp.src(angularFiles)
    .pipe(plumber())
    .pipe(concat("angular-all.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("client/dist/js"))
});

gulp.task("angular-watch",function(){
    gulp.watch("client/app/**/*.js",["angular-scripts"]);
});
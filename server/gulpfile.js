var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

var angularFiles = ["client/app/**/*.js"];

gulp.task("angular-scripts",function(){
    gulp.src(angularFiles)
    .pipe(concat("angular-all.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("client/app/external_scripts"))
});
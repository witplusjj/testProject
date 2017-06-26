var gulp = require("gulp"),
	webserver = require("gulp-webserver"),
	sass = require("gulp-sass"),
	livereload = require('gulp-livereload');

var src = "project/src";
var dist = "project/dist";

// webserver 설정
gulp.task('webserver', function() {
	gulp.src(dist + '/')
	.pipe(webserver({
		livereload: true,
		//port:8010,
		//host:'192.168.11.172',
		open:true
	}));
});

// sass 설정 (sass 파일을 css 로 컴파일한다.)
gulp.task("compile-sass", function(){
	return gulp.src(src + "/scss/*.scss")
		.pipe(sass()).on('error', sass.logError)
		.pipe(gulp.dest(dist + "/assets/css"));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch([src +"/scss/*.scss"], ['compile-sass']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

// default 설정
gulp.task("default", [
	"webserver",
	"compile-sass",
	"watch"
]);

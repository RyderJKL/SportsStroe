var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	webserver = require('gulp-webserver'),//加载模块
 	sass = require('gulp-ruby-sass'),
 	uglify = require('gulp-uglify'),
 	imagemin = require('gulp-imagemin');//图片压缩
//注册html任务
gulp.task('html',()=>{
	return gulp.src('src/**/*.html')//指明文件路径  /**/监听目录下所有的.html文件
    .pipe(gulp.dest('dist'));//输出路径
});
//注册任务
gulp.task('webserver',()=>{
	gulp.src('dist').pipe(webserver({
		livereload:true,
		port:'8887',
		open:'views/app.html'
	}));
});

//注册生产环境 Sass 任务
gulp.task('buildSass',()=>{
	return sass('src/sass/**/*.scss',{style:'compact'})//简洁格式的css
	.on('error',function(err){
		console.log('编译sass出错%s',err.message);
	})//指明文件路径  /**/监听目录下所有的.html文件
    .pipe(gulp.dest('dist/sass'));//输出路径
});

//注册开发环境 Sass 任务
gulp.task('devlopSass', () => {
	return sass('src/sass/**/*.scss',{style:'compact'})
	.on('error',function(err){
		console.log('编译sass出错%s',err.message);
	})
	.pipe(gulp.dest('src/sass/'));//输出路径
})

//注册js任务
gulp.task('myjs',()=>{
	return gulp.src('src/**/*.js')
	// .pipe(uglify({ preserveComments:'some'}))//保留注释压缩
	.pipe(gulp.dest('dist/'));
});

//压缩AJAX
gulp.task('node',()=>{
	return gulp.src('src/node/**/*.js')
	.pipe(uglify({ preserveComments:'some'}))//保留注释压缩
	.pipe(gulp.dest('dist/node')); 
});
//注册图片压缩任务
gulp.task('images',()=>{
	return gulp.src('src/img/**/*.{png,jpg,gif,svg}')
	.pipe(imagemin({ progressive:true,//无损压缩jpg
		svgoPlugins:[{removeViewBox:false}],//不溢出svgviewbox属性
	}))//保留注释压缩
	.pipe(gulp.dest('dist/img')); 
});
//监听任务
gulp.task('watch',function(){
	gulp.watch('src/views/*.html',['html']);//监听目录下所有的.html文件
});

// 监听 sass
gulp.task('watchBuildSass', function () {
	gulp.watch('src/sass/**/*.scss', ['buildSass'])
})

gulp.task('watchDevlopSass', function () {
	gulp.watch('src/sass/**/*.scss', ['devlopSass'])
})


gulp.task("watchJs", function () {
	gulp.watch('src/**/*.js', ['myjs'])
})
//默认任务
gulp.task('default',['buildSass','devlopSass','html','myjs','images','node','webserver','watch','watchBuildSass', 'watchDevlopSass','watchJs'], function () {
	console.log('yes')
});
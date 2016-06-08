//include plug-ins
var PATH = require('./gulpPaths.json'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),

    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');
	gulpIf = require('gulp-if'),
    gulpIgnore = require('gulp-ignore'),
    minifyCSS = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('clear', function () {

    return gulp.src(PATH.CleanBefore, {
            read: false
        })
        .pipe(clean({
            force: true
        }))
    
});

gulp.task('cleanTemp', function () {

    return gulp.src(PATH.temp, {
            read: false
        })
        .pipe(clean({
            force: true
        }))    
});

gulp.task('copy', function () {
    return gulp.src(PATH.ALL)
        .pipe(gulp.dest(PATH.DEST));
    gutil.log('Copy 2');
});


//JS hint task
gulp.task('jshint', function () {
    return gulp.src(PATH.ScriptsPath)
        .pipe(jshint())
    gutil.log('Js Hint 3');

});

//this function is used for generating minified versions of
//libraries for which min version was not available.
gulp.task('minifyit', function(){
	return gulp.src([
	           	  'WebContent/lib/vfs_fonts.js',
	        	  'WebContent/lib/csv.js',
	        	  'WebContent/lib/multiselect-tpls.js',
	        	  'WebContent/lib/angular.rangeSlider.js',
	        	  'WebContent/lib/topojson.js',
	        	  'WebContent/lib/dom-to-image.js',
	        	  'WebContent/lib/jspdf.js',
	        	  'WebContent/lib/select.js',
	        	  'WebContent/lib/html2canvas.js',
	        	  'WebContent/lib/html2canvas.svg.js',
	        	  'WebContent/lib/exportInline.js',
	        	  'WebContent/lib/rgbcolor.js',
	        	  'WebContent/lib/StackBlur.js',
	        	  'WebContent/lib/canvg.js'
	        	]).pipe(uglify()).pipe(gulp.dest("WebContent/lib/min"));
});

gulp.task("mergeLinks", function () {
    return gulp.src(PATH.HTML)
        .pipe(useref())
        .pipe(gulpIf('scripts/skp.min.js', ngAnnotate()))
        .pipe(gulpIf('scripts/skp.min.js', uglify()))
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulp.dest(PATH.BUILD));
});

//styles folder copy to build 
gulp.task('style', function () {
    return gulp.src(PATH.STYLES)
        .pipe(gulp.dest(PATH.BUILD + "/css"));
    gutil.log('style folder copy to build');
});

//fonts copy to build 
gulp.task('fonts', function () {
    return gulp.src(PATH.FONTS)

    .pipe(gulp.dest(PATH.BUILD + "/fonts"));
    gutil.log('fonts folder copy to build');
});

//images copy to build 
gulp.task('images', function () {
    return gulp.src(PATH.IMAGES)
        .pipe(gulp.dest(PATH.BUILD + "/assets/img"));
    gutil.log('IMG folder copy to build');
});


//Modules copy to build 
gulp.task('modules', function () {
    return gulp.src(PATH.MODULES)
        .pipe(gulp.dest(PATH.BUILD + "/modules"));
    gutil.log('Modules folder copy to build');
});
//copy files of js workers an require loaded js
gulp.task('workers', function () {
    return gulp.src(PATH.WORKERS)
        .pipe(gulp.dest(PATH.BUILD));
    gutil.log('Worker js files and excel builder copy to build');
});
//Modules copy to build 
gulp.task('data', function () {
    return gulp.src(PATH.DATAJASON)
        .pipe(gulp.dest(PATH.BUILD + "/data"));
    gutil.log('Modules folder copy to build');
});

gulp.task('build', function (callback) {
    runSequence('clear', 'copy', 'jshint',
        'mergeLinks', 'data', ['fonts', 'images', 'modules', 'workers'],
        'style', 'cleanTemp',callback)

});

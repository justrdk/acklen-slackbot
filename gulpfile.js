'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var istanbul = require('gulp-istanbul');

function onError(error) { process.exit(1);}

gulp.task('default', ['specs']);

gulp.task('specs', function(cb){
	console.log("Running specs to make sure nothing is broken.")
	var mocha = require('gulp-mocha');
	gulp.src(["scripts/**/*.js"])
		.pipe(istanbul({includeUntested: true}))
		.pipe(istanbul.hookRequire())
		.on('finish', function () {
	      gulp.src(['specs/**/*.js','!specs/fakes/**/*.js'])
	      	.pipe(debug())
	      	.pipe(mocha())
	        .pipe(istanbul.writeReports({reporters: ['text-summary','html'], reportOpts: { dir: "coverage"}}))
	        .on('end', cb);
	    });
});

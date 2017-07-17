let gulp = require('gulp');
let webserver = require('gulp-webserver');
let argv = require('yargs').argv;
let newfile = require('gulp-file');
let tap = require('gulp-tap');
 
gulp.task('default', ['webserver']);

gulp.task('create', function() {
    if(argv.page){
        return gulp.src('something')
        .pipe(newfile(argv.page + '.ts', 'declare var $;\n$( document ).ready(function() {\n\n});'))
        .pipe(newfile(argv.page + '.scss', '.'+argv.page+'{}'))
        .pipe(newfile(argv.page + '.pug', 'extends ./../layout.pug \nblock scripts \n\tscript(src="'+argv.page+'.js") \nblock content \n\tdiv.'+argv.page))
        .pipe(gulp.dest('dev/pages/'+argv.page));
    }else if (argv.component){
        return gulp.src('something')
        .pipe(newfile(argv.component + '.ts', 'declare var $;\n$( document ).ready(function() {\n\n});'))
        .pipe(newfile(argv.component + '.scss', '.'+argv.component+'{}'))
        .pipe(newfile(argv.component + '.pug', 'div.'+argv.component))
        .pipe(gulp.dest('dev/component/'+argv.component));
    }else{
        console.log('\x1b[31m%s\x1b[0m', '*error, please use --page or --component to create files');
    }
});

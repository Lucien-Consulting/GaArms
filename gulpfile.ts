'use strict';
// streams
import * as gulp from 'gulp';
import * as source from 'vinyl-source-stream';

// helpers
import * as notify from 'gulp-notify';
import * as rimraf from 'rimraf';

// js stuff
import * as concat from 'gulp-concat';
import * as sourcemaps from 'gulp-sourcemaps';
import * as ts from 'gulp-typescript';
import * as browserify from 'browserify';
import * as uglify from 'gulp-uglify';
import * as embedTemplates from 'gulp-angular-embed-templates';

// test server
// import * as Server from './node_modules/karma/lib/server';

// css
import * as less from 'gulp-less';
import * as cssnano from 'gulp-cssnano';

// style checkers
import * as tslint from 'gulp-tslint';
import * as stylish from 'gulp-tslint-stylish';

gulp.task('transpile', () => {
    // todo: figure out how to get sourcemaps to work after being transpiled
    // AND after browserified
    let tsResult = gulp.src([
            './**/*.ts',
            '!./node_modules/**/*.ts',
            '!./**/*.spec.ts'
        ])
        .pipe(embedTemplates({
            basePath: './'
        }))
        .pipe(ts({
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            moduleResolution: 'node',
            noImplicitAny: false,
            removeComments: true,
            sortOutput: true,
            target: 'ES5'
        }));

    return tsResult.js
        .pipe(gulp.dest('./temp/'));
});

gulp.task('browserify', (done) => {
    let browserfied = browserify('./temp/app.js')
        .bundle();
    return browserfied.pipe(source('inventory.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', () => {
    return gulp.src('./temp/inventory.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundleShims', () => {
    return gulp.src([
            './node_modules/angular2/bundles/angular2-polyfills.min.js',
            './node_modules/rxjs/bundles/Rx.umd.min.js'
        ])
        .pipe(concat('angular.shim.js'))
        .pipe(gulp.dest('./temp'));
});

gulp.task('bundleAll', () => {
    return gulp.src([
            './temp/angular.shim.js',
            './dist/inventory.js'
        ])
        .pipe(concat('inventory.bundled.js'))
        .pipe(gulp.dest('./dist/bundled'));
});

gulp.task('compileCSS', () => {
    return gulp.src('less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                '.'
            ]
        }))
        .pipe(cssnano({zindex:false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./styles'));
});

gulp.task('clean.temp', (done) => {
    rimraf('./temp', {force: true}, () => true);
    return done();
});

gulp.task('clean.dist', (done) => {
    rimraf('./dist', {force: true}, () => true);
    return done();
});

gulp.task('copyFonts', () => {
    return gulp.src('themes/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('copyImages', () => {
    return gulp.src('images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', gulp.parallel('clean.temp', 'clean.dist', (done) => done()));

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'compileCSS',
        gulp.series(
            'transpile',
            'browserify'
        )
    ),
    'copyImages',
    'bundleShims',
    'bundleAll',
    'clean.temp'
));
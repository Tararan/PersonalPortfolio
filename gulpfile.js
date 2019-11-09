const gulp = require('gulp');
const clean = require('gulp-clean');
const inlineCss = require('gulp-inline-css');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

gulp.task('default', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './mailings/dist'
        }
    });

    gulp.watch('./mailings/src/**/*.html', ['inlineStyles']);
    gulp.watch('./mailings/src/**/*.css', ['inlineStyles']);
    gulp.watch('./mailings/dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('clean', () => {
    return gulp.src('./mailings/dist', {read: false})
        .pipe(clean());
});

gulp.task('copy:images', () => {
    return gulp.src('./mailings/src/images/**/*')
        .pipe(gulp.dest('./mailings/dist/images/'));
});

gulp.task('inlineStyles', () => {
    return gulp.src('./mailings/src/*.html')
        .pipe(inlineCss({
            applyLinkTags: true,
            removeLinkTags: true,
            applyStyleTags: true,
            removeStyleTags: false,
            preserveMediaQueries: true,

            // DO NOT USE! There is a bug where px unit is applied to width attributes ...
            // applyTableAttributes: true,
            // applyWidthAttributes: false,
        }))
        .pipe(gulp.dest('./mailings/dist/'));
});

gulp.task('build', (callback) => {
    runSequence(
        'clean',
        ['inlineStyles', 'copy:images'],
        callback
    );
});

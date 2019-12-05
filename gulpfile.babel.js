import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

const paths = {
    scripts: {
        src: 'src/scripts/**/*.js', // **는 모든 폴더/파일을 본다는 의미
        dest: 'assets/scripts/'
    }
}

export const clean = () => del(['assets']);

export function scripts() {
    return gulp.src(paths.scripts.src, {sourcemaps: true})
        .pipe(babel())
        .pipe(gulp.dest(paths.scripts.dest));
}

export function watchFiles() {
    return gulp.watch(paths.scripts.src, scripts);
}

/* You could even use 'export as' to rename exported tasks
function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
}
export {watchFiles as watch};
*/

const build = gulp.series(clean, gulp.parallel(scripts, watchFiles));

export default build;
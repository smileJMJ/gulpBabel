import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import del from 'del';

const paths = {
    scripts: {
        src: 'src/scripts/**/*.js', // **는 모든 폴더/파일을 본다는 의미
        dest: 'assets/scripts/'
    }
}
const jsDir = './src/scripts/';

export const clean = () => del(['assets/scripts']);

export function scripts() {
    //return gulp.src(paths.scripts.src, {sourcemaps: true})
    return gulp.src([`${jsDir}constants.js`, `${jsDir}piece.js`, `${jsDir}board.js`, `${jsDir}main.js`], {sourcemaps: true}) // piece.js를 board.js, main.js보다 위에 올리기 위해
        .pipe(babel())
        .pipe(concat('index.js'))
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
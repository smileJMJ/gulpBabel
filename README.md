# 프로젝트 소개
- ES6를 사용할 수 있는 환경을 구축한다. (Gulp, Babel 등)
- https://medium.com/@michael.karen/learning-modern-javascript-with-tetris-92d532bcd057 을 예제로 테트리스를 만들어보며 공부한다.

# gulp 환경 구축
1. gulp-cli 설치  
  
```
npm install -g gulp-cli
```   
  
2. package.json 파일 생성하기  
 
 ```
 npm init
 ```  

3. gulp 설치하기 (개발할 때 필요하므로 개발환경에서만 설치되도록)

```
npm install --save-dev gulp
```

* 정상적으로 gulp 설치가 완료되면 ``` gulp -v ``` 를 통해 gulp 버전을 확인할 수 있다.

4. gulpfile 생성하기
* gulpfile.js를 프로젝트 루트 디렉토리에 생성한다.
* gulpfile은 ```gulp``` 명령어 실행 시 자동적으로 로드되는 파일
* src(), dest(), series(), parallel() 등 gulp의 API 들을 자주 볼 수 있다.
* Babel이나 TypeScript와 같은 변환이 필요한 언어를 사용할 땐 언어를 나타내고 트랜스파일러 모듈 설치가 가능하도록 gulpfile.js의 확장자를 바꿔준다.  
  * TypeScript : gulpfile.ts로 변경 후 ts-node 모듈을 설치함
  * Babel : gulpfile.babel.js로 변경 후 @babel/register 모듈을 설치함

```
function defaultTask(cb) {
    // place code for your default task here
    cb();
}
exports.default = defaultTask
```

5. 테스트
```
gulp
```

# babel 환경 구축
1. gulpfile.js를 gulpfile.babel.js 로 변경하기

2. babel 사용에 필요한 모듈들 설치하기
```
npm install --save-dev gulp-babel del @babel/register @babel/core @babel/preset-env
```
  * del 모듈은 특정 디렉토리를 삭제해주는 플러그인, 동기식으로 삭제할 수 있음  
     gulp 작업이 실행될 때 마다 기존 dist 디렉토리에 있는 파일들을 삭제해줘야 해서 사용함

3. .babelrc file 생성 후 아래의 코드를 추가한다.
```
{
    "presets": ["@babel/preset-env"]
}
```

4. gulpfile.babel.js 를 작성한다.
```
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
```
* style 관련 코드들은 gulp github를 참고한다.

# 출처
https://github.com/gulpjs/gulp  
https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles
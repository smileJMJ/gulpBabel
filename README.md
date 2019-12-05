# gulp 환경 구축
1. gulp-cli 설치  
  
```npm install -g gulp-cli```   
  
2. package.json 파일 생성하기  
 
 ```npm init```  

3. gulp 설치하기 (개발할 때 필요하므로 개발환경에서만 설치되도록)

```npm install --save-dev gulp```

* 정상적으로 gulp 설치가 완료되면 ``` gulp -v ``` 를 통해 gulp 버전을 확인할 수 있다.

4. gulpfile 생성하기
* gulpfile.js를 프로젝트 루트 디렉토리에 생성한다.
* gulpfile은 ```gulp``` 명령어 실행 시 자동적으로 로드되는 파일
* src(), dest(), series(), parallel() 등 gulp의 API 들을 자주 볼 수 있다.
* Babel이나 TypeScript와 같은 변환이 필요한 언어를 사용할 땐 언어를 나타내고 트랜스파일러 모듈 설치가 가능하도록 gulpfile.js의 확장자를 바꿔준다.  
```gulpfile.ts / gulpfile.babel.js```

```aidl
function defaultTask(cb) {
    // place code for your default task here
    cb();
}
exports.default = defaultTask
```

5. 테스트
```aidl
gulp
```


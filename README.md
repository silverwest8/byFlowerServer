# byFlowerServer

## Android App ByFlower의 Server


### AWS EC2 활용

###  Node.js(Express.js) 사용

    nvm install node

    pm2 start ecosystem.config.cjs --only byflower


* index.js가 가장 먼저 실행됨

* src폴더
* routes 폴더
    * user.js, flower.js, letter.js 에서 각 파트에 해당하는 기능 처리
* models 폴더
    * USER.js, FLOWER_LIKE.js, LETTER.js는 각 모델을 나타내며, 데이터베이스 접근 시 사용됨
* uploads폴더
    * 사용자가 업로드한 편지 사진이 이곳에 저장됨

----

1. Capture_AWSConsole.png
    - AWS colsole 캡쳐
2. Capture_EC2_SSH.png
    - AWS EC2 - vscode를 통해 ssh 접속 캡쳐
3. Capture_MysqlWorkBench.png
    - MysqlWorkBench를 통해 EC2 서버 내에 설치한 MySQL 접속 캡쳐
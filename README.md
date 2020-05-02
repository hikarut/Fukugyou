<img src="https://fukugyou.dev/ogimage.png">

[![Netlify Status](https://api.netlify.com/api/v1/badges/4bd29a1d-21af-45d6-ab20-904abd937c83/deploy-status)](https://app.netlify.com/sites/fukugyou/deploys)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/hikarut/Fukugyou)

## Fukugyou
「Fukugyou」はエンジニアのための複業メディアサイトです。<br>
複業・副業に関するニュースを毎日自動で更新します。
https://fukugyou.dev/

## build / start
```
$ npm install
$ npm run dev

# generate
$ npm run generate
```

※dev環境は`.env`ファイルを作成
```
SPACE=''
ACCESS_TOKEN=''
CONTENT_TYPE=''
API_KEY=''
AUTH_DOMAIN=''
DATABASE_URL=''
PROJECT_ID=''
STORAGE_BUCKET=''
MESSAGING_SENDER_ID=''
APP_ID=''
ADSENSE_ID=''
```

## 構成
* [Nuxt+Netlify+Vuetify+Contentfulでエンジニア向け複業メディアサイト作りました](https://fukugyou.dev/posts/20190506/)
* [複業メディアサイトをアップデートしました(Python+Firebase+Herokuのサーバレス構成)](https://fukugyou.dev/posts/20190818/)
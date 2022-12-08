[![Build](https://github.com/Taka005/TakasumiBOT/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Taka005/TakasumiBOT/actions/workflows/build.yml)
[![Lint](https://github.com/Taka005/TakasumiBOT/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/Taka005/TakasumiBOT/actions/workflows/lint.yml)
[![License: GPL](https://img.shields.io/badge/License-GPL-yellow.svg)](https://opensource.org/licenses/GPL-3.0)
[![Email](https://img.shields.io/badge/email-support@taka.ml-blue.svg?style=flat)](mailto:support@taka.ml)
# TakasumiBOTについて
- これはオープンソース版です
- このBOTは、他に人が確実に動かせるように開発されていません
- (このプロジェクトのforkを起動できた人は未だにいません)
- 質問等は受け付けますが、それでも動かない可能性があります
- LICENSEを遵守し利用してください
# 使い方
- 同じディレクトリに.envファイルを作成
- .example.envを.envに貼り付ける
- .envの中に DISCORD_BOT_TOKEN=(botのtoken) を記述する
- .envのその他の設定は、質問等でなんとかしてください
- install.bat(npm install) を実行
- npm start を実行
# configについて
- admin:管理者のユーザーID
- prefix:コマンドの先頭になる文字(一部のみに有効)
- servername:メインサーバーの名前
- serverid:メインサーバーID
- bump:bump時のメンション
- hello_message:ようこそメッセージ
- enter_channel:ようこそメッセージが送信されるチャンネルID
- member_channel:メンバーに参加をしらせるチャンネルID
- member_mention:メンバーに参加をしらせるロールID
# プルリクエストについて
- プルリクエストの内容はTakasumiBOT/module内のものしか受け付けておりません
- 気をつけて行なってください
# development
- development by Taka005#6668
- language is javascript(node.js)
- Discordサーバーにも是非参加してください
- https://discord.taka.ml/
# RealtimeCaption

Google Chrome の Web Speech API を使って音声認識で字幕を生成し、読み上げを行います。
OBS 等の配信ソフトでウィンドウキャプチャすることで動画配信のリアルタイムな字幕として使うことができます。

![Screenshot](https://user-images.githubusercontent.com/5355966/71542271-b4557c80-29a7-11ea-9075-354d54e886cf.PNG)

## Usage

https://ryohey.github.io/RealtimeCaption/ を開き、認識開始ボタンをクリックします。
マイクの使用許可を求めるポップアップが表示されるので許可すると音声認識が始まります。

OBS Studio でソースにウィンドウキャプチャを追加し、フィルタからクロマキーを選択します。
ブラウザのツールバーが映らないように、OBS のプレビュー画面で Alt キーを押しながら字幕のウィンドウをドラッグしてトリミングします。

## Caution

Google Chrome は Google のサーバー上で音声認識を行っていますので、プライバシー上の懸念がある方はご注意ください。 https://www.google.com/chrome/privacy/whitepaper.html#speech 
また、そのためこのスクリプトはオフラインでは動作しません。

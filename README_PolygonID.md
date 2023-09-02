## Polygon ID Wallet AppによるVCの提示

### 検証用2次元コードの生成

検証用2次元コードの生成方法は、[Polygon ID Documentation tutorials](https://0xpolygonid.github.io/tutorials/)の[On-chain ZK Verification](https://0xpolygonid.github.io/tutorials/verifier/on-chain-verification/overview/)内の「Add the Proof Request Inside a QR Code」の記載内容の通りで、手順は下記の通りである。

1. リクエスト用のJSONファイルの作成

    Tutorialsの内容にもとづき、リクエスト用のJSONファイルを作成する。
    作成したJSONファイルは`public/images`に格納している。

2. 二次元コードの生成

    [2次元コード生成サイト](https://qr.io/)を利用し、1で作成したJSONファイルを二次元コードに変換する。
    作成した2次元コードは`public/images`に格納している。

### Polygon ID Wallet Appでの2次元コードの読み取り

Polygon ID Wallet Appを起動し、2次元コードを読み込むことでゼロ知識証明が生成されVCの提示が行われる。
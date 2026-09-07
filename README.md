# ふるさとマッチ

訪日外国人と、地域に暮らす案内役「ふるさとガイド」をつなぐ交流マッチングアプリのプロトタイプです。

## 開発

```bash
npm install
npm run dev
```

## 静的ビルド

このプロジェクトは `next.config.mjs` で `output: 'export'` を有効にしており、以下で静的ファイルを生成できます。

```bash
npm run build
```

生成先は `out` です。

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`

GitHub リポジトリを Cloudflare Pages に接続すれば、`main` ブランチへの push ごとに再デプロイできます。

## 補足

`public/guides` と `public/events` の画像は、元画像未提供のため現在は仮画像です。正式画像に差し替える場合は同名ファイルを置き換えてください。

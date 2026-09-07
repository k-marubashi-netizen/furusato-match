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

## 画像

`public/guides` と `public/events` に本番用画像を配置しています。画面側は `/guides/guide-1.png` などの静的パスで参照します。

## 補足

Cloudflare Pages で変更が反映されない場合は、最新の `main` コミットが Production deployment に使われているか確認してください。

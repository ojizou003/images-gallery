# AI Image Gallery

AI 生成画像を管理・閲覧するためのギャラリーアプリケーションです。 Next.js と
Supabase を使用して構築されています。

デモ:
[https://images-gallery-lime-delta.vercel.app/](https://images-gallery-lime-delta.vercel.app/)

## 機能

- **画像アップロード**: ドラッグ＆ドロップで画像をアップロードし、スタイルとキャ
  プションを付与できます。
- **ギャラリー表示**: Masonry レイアウトで画像を美しく表示します。
- **検索**: スタイルやキャプションで画像をリアルタイムに検索できます。
- **詳細表示**: 画像の拡大表示、メタデータの確認、ダウンロード、削除が可能です。

## 技術スタック

- **Frontend**: Next.js (App Router), Tailwind CSS, Lucide React
- **Backend**: Supabase (PostgreSQL, Storage)

## ローカルでの実行方法

1.  リポジトリをクローンします。

2.  依存関係をインストールします。

    ```bash
    npm install
    ```

3.  環境変数を設定します。 `.env.local.example` をコピーして `.env.local` を作成
    し、Supabase の URL と Anon Key を入力してください。

    ```bash
    cp .env.local.example .env.local
    ```

4.  開発サーバーを起動します。

    ```bash
    npm run dev
    ```

5.  ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## デプロイ

Vercel へのデプロイを推奨します。詳細な手順は `deploy.md` (または
`docs/deploy.md` ※もし移動していれば) を参照してください。

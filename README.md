# Welcome to Remix Space X!

- [Remix Docs](https://remix.run/docs)

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
git clone https://github.com/doc-alvarez/DEPT_SpaceX.git
```

```sh
cd ./project-dir
npm install
```

Instead of localstorage I used a sqlite database using prisma ORM.
We need to setup prisma before launching the app.

```sh
npm install --save-dev prisma
npm install @prisma/client #If not installed already
```

```sh
npx prisma init --datasource-provider sqlite

npx prisma db push
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

### I hope you enjoy it. 🚀

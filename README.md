## Getting Started

```
git clone https://github.com/BristechSRM/frontend.git
cd frontend

npm install
npm start
```

Navigate to http://localhost:8080 to view the frontend.

## Formatting

We recommend using [Atom](https://atom.io/) for making code changes, although any text editor/IDE will suffice.

Webpack is configured to use [ESLint](http://eslint.org/) via the [Webpack ESLint loader](https://github.com/MoOx/eslint-loader). The configuration of ESLint is within the `.eslintrc.json` file in the project root.

By default, auto-fixing of ESLint issues is enabled. For issues that cannot be auto-fixed, Webpack will display them in the cli using the [eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter).

To see ESLint issues directly in Atom, you can install the `linter-eslint` atom package via your cli:

```
apm install linter-eslint
```

If you wish to beautify your code, we use the [atom beautify](https://atom.io/packages/atom-beautify) package, which you can install via your cli:

```
apm install atom-beautify
```

With this package installed, you can press `ctrl-alt-b` within a file, or `Packages > Beautify` to format the file to our ESLint standards. The atom beautify settings are configured in the `.jsbeautifyrc` file within the project root.

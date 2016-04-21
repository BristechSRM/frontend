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

### React

For React syntax highlighting, you can install the `react` Atom package from your cli:

```
apm install react
```

### ESLint

Webpack is configured to use [ESLint](http://eslint.org/) via the [Webpack ESLint loader](https://github.com/MoOx/eslint-loader). The configuration of ESLint is within the `.eslintrc.json` file in the project root.

By default, auto-fixing of ESLint issues is disabled. Webpack will display linting issues in the cli using the [eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter).

To see ESLint issues directly in Atom, you can install the `linter-eslint` Atom package via your cli:

```
apm install linter-eslint
```

### stylelint

For SASS linting we use [stylelint](http://stylelint.io/) using the stylelint-config-standard settings. The settings for stylelint can be configured with the `.stylelintrc` file in the root of the project.

To display SASS linting issues in Atom, you can install the linter-stylelint package:

```
apm install linter-stylelint
```

### Beautify

If you wish to beautify your code, we use the [atom beautify](https://atom.io/packages/atom-beautify) package, which you can install via your cli:

```
apm install atom-beautify
```

With this package installed, you can press `ctrl-alt-b` within a file, or `Packages > Beautify` to format the file to our ESLint standards. The atom beautify settings are configured in the `.jsbeautifyrc` file within the project root.

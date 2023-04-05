# Shopping cart app

A shopping cart application made with QUASAR Framework.

## Status

- This application is a prototype. It provides a limited shopping cart application following certain standards and principles of clean architecture.
That said, feel free to use the discussions tab to help each other out.

- Backend interactions are mock, where certain functionalities are provided but for now is not my intention to cover this at the prototype.

- To simplify the fast development, you can find some abstractions and utilities here in the same package, a real application should be in other packages(entities, helpers).

## Tech

- [QUASAR](https://quasar.dev/)
- [Vue composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)
- [Typescript](https://www.typescriptlang.org/)
- [BEM Methodology](https://getbem.com/)

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

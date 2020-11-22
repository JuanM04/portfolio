---
title: "How To Use Tailwind CSS v2 with Next.js v10"
---

In this guide, we'll walk through how to install Tailwind CSS in a Next.js project.

## Create a new project
If you are starting fresh, run the following command to create a new Next.js project. Otherwise, you can proceed with these steps to add Tailwind to an existing Next.js app.

```bash
npm create next-app next-js-tailwind
cd next-js-tailwind
```

## Install dependencies
Run the following to install Tailwind and a few other packages:

``` bash
yarn add -D postcss tailwindcss autoprefixer @fullhuman/postcss-purgecss
```

## Configure the build pipeline
Create a `postcss.config.js` file with the following contents:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './components/**/*.js',
              './pages/**/*.js'
            ],
            defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
          }
        }
      : {})
  }
};
```

Here were are running PurgeCSS in production to keep the CSS size to a minimum.

If you use TypeScript, remember to change `*.js` to `*.tsx`!

## Add Tailwind to your CSS
Create a styles.css file in the root of your project with the Tailwind directives:

```css
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */

@tailwind utilities;
```

The purgecss comments tell PurgeCSS to never purge important base styles.

## Init Tailwind

It's recommended to have a `tailwind.config.js` for future customization and IntelliSense working.

```bash
yarn tailwindcss init
```

## Import your CSS
If you don't already have a custom `pages/_app.js` file, create one like this:

```js
import '../styles.css';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
```

If you already have a custom app file, just add the import for your stylesheet. That's it! You can now start using Tailwind CSS utilities in your className attributes!

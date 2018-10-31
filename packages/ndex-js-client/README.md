# NDEx Javascript client

Webpack based NDEx client libraries (Input: ES6, Output: universal library)


## Features

* Webpack 4 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Build your library
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version of your library.
2. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
3. Running the tests
  * Run `npm run test`

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)
* `npm run test:watch` - same as above but in a watch mode

## Readings

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)


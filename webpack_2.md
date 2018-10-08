## Webpack 2: The Complete Developer's Guide

[Webpack 2: The Complete Developer's Guide](https://www.udemy.com/webpack-2-the-complete-developers-guide/)

### WHAT DOES WEBPACK DO?

#### Why Do We Use Build Tools
- because spa has alot of js code and that js code needs to be organized

#### Javascript Modules

#### The Purpose of Webpack

- With alot of js modules, two issues arise:
    1. gauranteeing load order (e.g. if index.js relies on utils.js and store.js, how can we make sure that everytime we run the js code, utils.js and store.js loads first before index.js) (i.e. dependency tree)
    2. have many js files and loading them over http connection is very slow especially on mobile devices

- webpack takes big collection of small js modules and putting them inside one bundle.js .. also handles transpiling es6/7 to es5, css, but those are side effects. This guarentees that:
    1. load order 
    2. have only 1 module

#### Webpack in Action

- make 2 js modules and see what webpack does
- what we are gonna do:
    1. make npm project
    2. create 2 js modules
    3. install and config webpack
    4. run + inspect webpack output

`package.json`    
```json
{
    "dependencies": {

    }
}
```
```javascript
// src/index.js
// index.js calls functions in the sum.js
// index imports sum, so sum.js needs to LOAD BEFORE index.js
```

```javascript
// src/sum.js
// a utility function for math operations
const sum = (a, b) => a + b;
// remember that each js file has it's own scope
```
    
#### Review of JS Modules
- CommonJS modules: require, module.exports, sync
- AMD: async module loading
- ES2015: import

#### Linking Files with CommonJS
- sum.js has no dependencies
- index.js needs sum.js 

  
#### Webpack Installation and Configuration

```
input: sum.js --> index.js --> webpack--> output: bundle.js
                                    ^
                                    |
                                    webpack.config.js
```

```javascript
// src/index.js
const sum = require('./sum');

const total = sum(10, 5);
console.log(total);
```

```javascript
// src/sum.js

```

`package.json`
```json
{
    "devDependencies": {
        
    }
}
```

```javascript
// webpack.config.js
// webpack will look at this file to get the configurations

// the index.js file is the thing that kicks off our app, so we call it the entry point of our appplication

const config = {

    // 2 minimum properties we have to config:
    // 1. the entry property: 
    //    - the index.js file is the file that we run to start our project
    //    - the index.js is also the one that export anything (i.e. no other file depends on the index.js), so it is the ENTRY FILE
    //    - webpack would start at the entry file and look at the files that it imports, then look at the other file that those import and so forth. That's how it builds the dependency tree

    entry: './src/index.js'

};

module.exports = config;
```

#### More on Webpack Configuration

```javascript
const path = require('path');

const config = {
    // 2 minimum properties we have to config:
    // 1. the entry property: 
    //    - the index.js file is the file that we run to start our project
    //    - the index.js is also the one that export anything (i.e. no other file depends on the index.js), so it is the ENTRY FILE
    //    - webpack would start at the entry file and look at the files that it imports, then look at the other file that those import and so forth. That's how it builds the dependency tree

    entry: './src/index.js',

    // 2. output property:
    output: {
        path: path.resolve(__dirname, 'build'), // HAS TO BE ABSOLUTE PATH. .resolve() creates a path string for any os system
        
        // __dirname, build puts the bundle.js in a folder called 'build' in the homedir of our project 
        
        filename: 'bundle.js'
    }
};
module.exports = config;
```
#### Running Webpack

`package.json`
```json
{
    "scripts": {
        "build": "webpack"
    },
    "devDependencies": {
        "webpack": "^2.2.0-rc.0"
    }
}
```

- why would we make a script to run just one command?
    - because when we set the command 'webpack' to 'npm run build', it will run the webpack installed inside the project. else it would run the global webpack
- run `npm run build`. Notice that the output bundle.js is always much larger than the source files that it built

#### The Bundle.js File

- this is what the `bundle.js` sort of looks like (pseudo code):

```javascript
var myModules = []
```



 

## Webpack 2: The Complete Developer's Guide

### What Does Webpack Do?

#### Webpack Installation and Configuration

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
    'devDependencies': {
        
    }
}
```

```javascript
// webpack.config.js
// webpack will look at this file to get the configurations

// the index.js file is the thing that kicks off our app, so we call it the entry point of our appplication



```

```
input: sum.js --> index.js --> webpack--> output: bundle.js
                                    ^
                                    |
                                    webpack.config.js
 ```
 
 
 

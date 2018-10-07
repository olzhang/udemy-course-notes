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
}
```

```
input: webpack --> index.js --> webpack--> output: bundle.js
                                    ^
                                    |
                                    webpack config
 ```

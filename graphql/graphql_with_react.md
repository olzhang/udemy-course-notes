## GRAPHQL WITH REACT: THE COMPLETE DEVELOPER'S GUIDE

[GraphQL with React: The Complete Developer's Guide](https://www.udemy.com/graphql-with-react-course/)

### SECTION 1: WHY GRAPHQL?

- Why use GraphQL? What is GraphQL? How we use GraphQL 

### SECTION 2: A REST-FUL ROUTING PRIMER

#### 3. Review of REST-ful Routing
- use endpoints to get/delete/add/remove data

#### 4. Shortcomings of RESTful Routing
- when we have normalized data in the database, we would need to nest rest endponts to query data and in the end we would create a very customized endpoint that would get a customized dataset that would break rest conventions. We might also end up overserrving data

![Broken Endpoints](./restful_shortcomings.png)


### SECTION 3: ON TO GRAPHQL

#### 5. What is GraphQL

![Basic GraphQL](./basic_graphql_query.png)


#### 6. Working with GraphQL

`npm i --save express express-graphql graphql lodash`

```javascript
// server.js
const express = require('express');

app = express();

app.liste(4000, () => {
    console.log("hi");
})
```

#### 7. Resgistering GraphQL with Express

```javascript
// server.js
const express = require('express');
const expressGraphQL = require('express-graphql');

app = express();

app.use('/graphql', expressGraphQL({
    'graphiql': true
}))

app.liste(4000, () => {
    console.log("hi");
})

// Will give us an middleware error telling us no Schema
```

#### 8. GraphQL Schema

- we have to pass in a Schema to the expressGraphQL

```javascript
// schema.js
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})
```

#### 10. Root Query & 11. Resolve Data

- we need to pass in an "entry" query to GraphQL

```javascript
// schema.js
const graphql = require('graphql');
const find = require('lodash.find');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    { id: "23", firstName: "Test23", age: 25},
    { id: "24", firstName: "Test24", age: 26},
    { id: "25", firstName: "Test25", age: 27},
]

const UserType = new GraphQLObjectType({
    name: 'User',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                // resolve function allows us to return data from the query
                // Returns th
                return find(users, { id: args.id })
            }
        }
    }
})

// need to get it to return the rootquery to a schema
// need to get it to return the rootquery to a schema
RootSchema = new GraphQLSchema({
    query: RootQuery
});

module.exports = RootSchema;
```

```javascript
// server.js
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema')

app = express();

app.use('/graphql', expressGraphQL({
    'graphiql': true,
    schema: schema
}))

app.liste(4000, () => {
    console.log("hi");
})

// Will give us an middleware error telling us no Schema
```

#### 12. The GraphiQL Tool

The below query is a graphql query to get the id firstName and age
```javascript
{
    user(id: "23") {
        id,
        firstName,
        age
    }
}
```

#### 13. A Realistic Datasource

In a real enterprise there will be a multitude of datasources that would need to be aggregated in order to fetch data together as single json

![Multiple Data Sources](./multiple_data_sources.png)

to mockup a json api we can use this: https://github.com/typicode/json-server

#### 14. Async Resolve Function

```javascript
// schema.js
const graphql = require('graphql');
// const find = require('lodash/find');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// const users = [ 
//     { id: "23", firstName: "Test23", age: 25},
//     { id: "24", firstName: "Test24", age: 26},
//     { id: "25", firstName: "Test25", age: 27},
// ]

const UserType = new GraphQLObjectType({
    name: 'User',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                // resolve function allows us to return data from the query
                // Returns th
                // return find(users, { id: args.id })
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data)
            }
        }
    }
})

// need to get it to return the rootquery to a schema
// need to get it to return the rootquery to a schema
RootSchema = new GraphQLSchema({
    query: RootQuery
});

module.exports = RootSchema;
```

#### 16. Company Definitions

![User To Companies](./user_companies.png)


### SECTION 3: FETCHING DATA WITH QUERIES

#### 17. Nested Queries

we need to associate the company type 

```javascript
// schema.js
// 
// 

//sample data definitions
//
const users = [ 
    { id: "23", firstName: "Test23", age: 25, companyId: "1"},
    { id: "24", firstName: "Test24", age: 26, companyId: "2"},
    { id: "25", firstName: "Test25", age: 27, companyId: "3"},
]
// 
const companies = [ 
    { id: "1", name: "Apple", description: "iPhone"},
    { id: "2", name: "Microsoft", description: '"Win 10'},
    { id: "3", name: "Amazon", description: "Alexa"},
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType // <---- THIS IS HOW RELATIONS WORK
        }
    }
});

```

#### 18. More on Nested Queries

![Resolve Relations](./resolve_relations.png)

Notice in the code below we don't specify the FK from user to company in `UserType` as `companyId` (instead we specify as `company`) as per our data definition. Because we will use the resolve function to specify the value of `company` to map it to `companyId`,

```javascript
// schema.js
// 
// 

//sample data definitions
//
const users = [ 
    { id: "23", firstName: "Test23", age: 25, companyId: "1"},
    { id: "24", firstName: "Test24", age: 26, companyId: "2"},
    { id: "25", firstName: "Test25", age: 27, companyId: "3"},
]
// 
const companies = [ 
    { id: "1", name: "Apple", description: "iPhone"},
    { id: "2", name: "Microsoft", description: '"Win 10'},
    { id: "3", name: "Amazon", description: "Alexa"},
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    // all the different props that a user has
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType, // <---- THIS IS HOW RELATIONS WORK
            resolve(parentValue, args) {
                axios.get(`http://localhost:3000/${parentValue.companyId}`).then(res => res.data);

                // this is how relations work. parentValue is the value "parent" type object. In ths case, company is nested in UserType so the parent is the value we fetch back from user
            }
        }
    }
});

```

We can how query like so:

```javascript
{
    user(id: "23") {
        firstName,
        company: {
           id,
           name,
           description 
        }
    }
}
```

and get back 
```javascript
{
    "data": {
        "user": {
            "firstName": "Test23",
            "company": {
                "id": "1",
                "name": "Apple",
                "description": 'iPhone'
            }
        }
    }
}
```

#### 19. A Quick Breather

![Resolve Relations](./resolve_relations.png)

The `resolve` function is what takes you from one type to another type

![Real Table Associations](./table_association.png)

![GraphQL Interpretation](./graphql_association.png)

![Complicated](./more_complicated_association.png)

![Resolve Pathway](./resolve_path_example.png)

Think about the `resolve` function as edges and the types as nodes




 

myModule
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
const sum = (a, b) => a+b;
module.exports = sum 
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
var myModules = [
    function() { // everything inside of sum.js
        const sum = (a,b) => a+b;
        return sum;
    },
    function() { // everything inside of index.js
        const sum = myModules[0]();
        const total = sum(10, 10);
        console.log(total);
    }
];

var entryPointIndex = 1;
myModules[entryPointIndex]();
```
#### Running the App
to run the `bundle.js` we will have 1 html file that loads the `bundle.js`, we will call this file `index.html`
```html
<!-- index.html -->
<head>
</head>
<body>
    <script type="text/javascript" src="bundle.js" />
</body>
```

#### Intro to Loaders 
- webpack determines the dependencies of a bunch of modules and orders them
- module loaders: do some pre-processing before putting modules into `bundle.js`
- e.g. Babel, images, etc etc
- First module loader we will look at is Babel
- Babel transpiles ES6,7,8 to ES5.
- To be clear:
    - Babel: transpiles ES6,7,8 to ES5.
    - Webpack: links up js modules together
- there's 3 modules we need to get Babel setup:
    1. babel-loader: Teaches babel how to work with webpack. Babel can work wth dozen build systems, not just webpack. So babel needs to configured to work with webpack.
    2. babel-core: knows how to take code, parse it, and generate some output file. Babel doesn't
    3. babel-preset-env: ruleset for telling babel exactly what pieces of es6/7/8 syntax to look for to turn into es5. E.g. 'look at the const keyword, look at the object preset'
- command: `yarn add --dev babel-loader babel-core babel-preset-env`

#### Babel Setup for ES2015
- loaders: individual libraries that can run on different files in our project
- wiring up Babel:
![Babel Diagram](./babel_setup.png)
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

    entry: './src/index.js',
    // 2. output property:
    output: {
        path: path.resolve(__dirname, 'build'), // HAS TO BE ABSOLUTE PATH. .resolve() creates a path string for any os system
        
        // __dirname, build puts the bundle.js in a folder called 'build' in the homedir of our project 
        
        filename: 'bundle.js'
    },

    // 'module' property is new in webpack 2. In webpack 1 these pre-processing steps are called 'loaders', but now each 'loader' is a 'rule' in 'modules'
    module: {
        rules: [
            // inside each rule we have an object to define the rule
            {
                use: 'babel-loader', // use defines which loader to use
                test: /\.js/, // a regex exp that applies the loader (in this case 'babel-loader') to any file that matches the regex

            }
        ]
    }

};

module.exports = config;
```

#### Babel Configuration
The `.babelrc` file specifies the set of rules to run when you use the babel-loader loader in webpack
```json
{
    "presets": ["babel-preset-env"]
}
```

We can now run `npm run build` and get the `bundle.js`

#### Refactor to ES2015 Module

```javascript
// src/index.js
import sum from './sum';

const total = sum(10, 5);
console.log(total);
```

```javascript
// src/sum.js
const sum = (a, b) => a+b;

export default sum;
```

#### Handling CSS with Webpack
`css-loader` allows us to import `.css` into our `.js` files

e.g. ![CSS Loader](./loading_css.png)

- the benefit of using webpack to handle css is that it allows us to load css files into our js
- Note: importing the css does not scope the css to some file. It just shows a relationship between a css file and a js one

```javascript
// src/image_viewer.js
const image = document.createElement('img');
image.src = 'http://lorempixel.com/400/400';

document.body.appendChild(image);

```
```javascript
// src/index.js
import sum from './sum';
import './image_viewer.js';

// why do we just do import './image_viewer.js'? without assigning it to a variable? because we are not using it, it's just executing code

const total = sum(10, 5);
console.log(total);

```

#### The Style and CSS Loaders

```css
/* styles/ */



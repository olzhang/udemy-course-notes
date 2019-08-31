// server.js
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema')

app = express();

app.use('/graphql', expressGraphQL({
    'graphiql': true,
    schema: schema
}))

app.listen(4000, () => {
    console.log("hi");
});


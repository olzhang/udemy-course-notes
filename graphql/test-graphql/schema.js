const graphql = require('graphql');
const find = require('lodash/find');

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
RootSchema = new GraphQLSchema({
    query: RootQuery
});

module.exports = RootSchema;



import { ApolloServer, gql } from 'apollo-server-cloud-functions';
import resolvers from './resolvers';
import typeDefs from './type-def';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


exports.handler = server.createHandler();
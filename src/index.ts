import { ApolloServer, gql } from 'apollo-server-cloud-functions';
import typeDef from './type-def';

const server = new ApolloServer({
  typeDefs: typeDef,
  mocks: true, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
});


exports.handler = server.createHandler();
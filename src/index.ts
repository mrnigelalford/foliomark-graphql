import { ApolloServer } from 'apollo-server-cloud-functions';
import { MongoClient } from 'mongodb'
import Authors from './dataSources/Authors';
import typeDef from './type-def';

const client = new MongoClient(process.env.mongoURL);
client.connect()

const server = new ApolloServer({
  typeDefs: typeDef,
  dataSources: () => ({
    authors: new Authors(client.db().collection('web')),
  }),
  mocks: true, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
});


exports.handler = server.createHandler();
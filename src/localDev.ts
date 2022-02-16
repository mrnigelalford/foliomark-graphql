import { ApolloServer as localApolloServer } from 'apollo-server';
import { MongoClient } from 'mongodb';
import typeDef from './type-def';
import resolvers from './dataSources/resolvers';

import Assets from './dataSources/Assets';
import Authors from './dataSources/Authors';
import Auctions from './dataSources/Auctions';
import Collections from './dataSources/Collections';

require('dotenv').config();

const client = new MongoClient(process.env.mongoURL);
client.connect();

const server = new localApolloServer({
  typeDefs: typeDef,
  resolvers,
  dataSources: () => ({
    authors: new Authors(client.db('foliomark').collection('authors')),
    assets: new Assets(client.db('foliomark').collection('assets')),
    auctions: new Auctions(client.db('foliomark').collection('auctions')),
    collections: new Collections(
      client.db('foliomark').collection('collections')
    ),
  }),
  mocks: false, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
    `);
});

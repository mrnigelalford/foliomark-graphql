import { ApolloServer } from 'apollo-server-cloud-functions';
import { MongoClient } from 'mongodb';
import typeDef from './type-def';
import resolvers from './dataSources/resolvers';

import Assets from './dataSources/Assets';
import Authors from './dataSources/Authors';
import Auctions from './dataSources/Auctions';
import Collections from './dataSources/Collections';

const client = new MongoClient(process.env.mongoURL);
client.connect();

const server = new ApolloServer({
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
});

exports.handler = server.createHandler();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient } from 'mongodb';
import typeDef from './type-def';
import resolvers from './dataSources/resolvers';

import Assets from './dataSources/Assets';
import Authors from './dataSources/Authors';
import Auctions from './dataSources/Auctions';
import Collections from './dataSources/Collections';

const client = new MongoClient(
  'mongodb+srv://fmark:F5bFfheX3y@foliomarkserverle.lpfzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
client.connect();

const server = new ApolloServer({
  typeDefs: typeDef,
  resolvers
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      dataSources: () => ({
        authors: new Authors(client.db('foliomark').collection('authors')),
        assets: new Assets(client.db('foliomark').collection('assets')),
        auctions: new Auctions(client.db('foliomark').collection('auctions')),
        collections: new Collections(
          client.db('foliomark').collection('collections')
        ),
      }),
    }
  },
  listen: {port}
})


console.log(`🚀 Server listening at: ${url}`);

import axios from 'axios';
import { MongoClient } from 'mongodb';

interface OperationProps {
  contractAddress?: string;
}
const client = new MongoClient(process.env.mongoURL);

const setOperations = async () => {
  const contractAddress = 'tz1hpJydx7Y3vAcQSuXM449SH8J3cgXhC5bX';
  const session = await client.connect();

  const url = `https://api.ithacanet.tzkt.io/v1/accounts/${contractAddress}/operations?type=origination%2Ctransaction%2Creveal&limit=40&sort=1&quote=usd`;

  const operations = await axios.get(url).catch(function (error) {
    console.log('pin_error: ', error);
  });
  // pull data from operations
  // filter to latest?
  // insert operations

  if (operations) {
    const filteredOperations = [];
    operations.data.forEach((op) => {
      filteredOperations.push(op.parameter.value);
    });

    filteredOperations.forEach((op) => {
      session
        .db(process.env.dbName)
        .collection('operations')
        .insertOne({ ipfs: op.itokenMetadata.ipfs }, op);
    });

    session.close();
  }
};

const getOperations = async () => {
  const session = await client.connect();
  return session.db(process.env.dbName).collection('operations').find();
};

const startOperationsPoll = () => {
  setTimeout(() => {
    setOperations();
  }, 2000);
};

export { setOperations, getOperations };

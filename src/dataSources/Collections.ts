import MongoDataSource from 'apollo-mongodb-datasource';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import { Collection } from '../Types/Collection.type';
import { OperationProps } from './resolvers';

export default class Collections extends MongoDataSource {
  client = new MongoClient(process.env.mongoURL);
  private contractOperations: Object[];

  getCollectionByID(id: string) {
    return this.findOne(id);
  }

  async getAllCollections() {
    const session = await this.client.connect();
    const auction = await session
      .db(process.env.dbName)
      .collection('collections')
      .aggregate([
        {
          $lookup: {
            from: 'assets',
            localField: 'assetIDs',
            foreignField: '_id',
            as: 'assets',
          },
        },
      ])
      .toArray();
    return auction;
  }

  setCollection = async (props: Collection) => {
    const session = await this.client.connect();
    session
      .db(process.env.dbName)
      .collection('collections')
      .insertOne({
        title: props.title,
        assetIDs: props.assetIDs,
        description: props.description,
        img: props.img,
        views: props.views,
        likes: props.likes,
      })
      .then((res) => {
        console.log('insert successful: ', res);
        session.close();
      });

    return 'success';
  };

  async getOperations({ contractAddress }: OperationProps) {
    const url = `https://api.tzkt.io/v1/accounts/${contractAddress}/operations?type=origination%2Ctransaction%2Creveal&limit=40&sort=1&quote=usd`;
    return axios
      .get(url)
      .then(function (response) {
        console.log('pin_success: ', response);
        this.contractOperations = response;
      })
      .catch(function (error) {
        console.log('pin_error: ', error);
      });
  }
}

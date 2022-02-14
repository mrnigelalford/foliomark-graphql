import MongoDataSource from 'apollo-mongodb-datasource';
import { MongoClient } from 'mongodb';
import { NFT } from '../Types/NFT.type';

export default class Asset extends MongoDataSource {
  client = new MongoClient(process.env.mongoURL);

  getAssetByID(id: string) {
    return this.findOne({ id });
  }

  getAllAssets() {
    return this.find();
  }

  setAsset = async (props: NFT) => {
    const session = await this.client.connect();
    session
      .db(process.env.dbName)
      .collection('assets')
      .insertOne({
        title: props.title,
        description: props.description,
        price: props.price,
        category: props.category,
        token: props.token,
      })
      .then((res) => {
        console.log('insert successful: ', res);
        session.close();
      });

    return 'success';
  };
}

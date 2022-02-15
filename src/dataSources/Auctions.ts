import MongoDataSource from 'apollo-mongodb-datasource';
import { MongoClient } from 'mongodb';
import { Auction } from '../Types/Auction.type';

export default class Auctions extends MongoDataSource {
  client = new MongoClient(process.env.mongoURL);

  getAuctionByID(id: string) {
    return this.findOne({ id });
  }

  async getAllAuctions() {
    const session = await this.client.connect();
    const auction = await session
      .db(process.env.dbName)
      .collection('auctions')
      .aggregate([
        {
          $lookup: {
            from: 'assets',
            localField: 'nftID',
            foreignField: '_id',
            as: 'asset',
          },
        },
      ])
      .toArray();

    console.log('auction: ', auction);
    return auction;
  }

  setAuction = async (props: Auction) => {
    const session = await this.client.connect();
    session
      .db(process.env.dbName)
      .collection('auctions')
      .insertOne({
        nftID: props.nftID,
        auctionURL: props.auctionURL,
        startingPrice: props.startingPrice || 0,
        currentPrice: props.currentPrice || 0,
        endDate: props.endDate,
        bids: props.bids || 0,
        token: props.token || 'XTZ',
      })
      .then((res) => {
        console.log('insert successful: ', res);
        session.close();
      });

    return 'success';
  };
}

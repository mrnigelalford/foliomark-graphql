import { Auction } from '../Types/Auction.type';

export default {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.assets.getAssetByID(id),
    assets: (_, __, { dataSources }) => dataSources.assets.getAllAssets(),
    auctions: (_, __, { dataSources }) => dataSources.auctions.getAllAuctions(),
    auction: (_, { id }, { dataSources }) =>
      dataSources.auctions.getAuctionByID({ id }),
    author: (_, { id }, { dataSources }) =>
      dataSources.authors.getAuthorByID({ id }),
  },
  Mutation: {
    setAsset: async (
      _,
      { title, description, price, category, token },
      { dataSources }
    ) => {
      return await dataSources.assets.setAsset({
        title,
        description,
        price,
        category,
        token,
      });
    },
    setAuction: (_, props: Auction, { dataSources }) =>
      dataSources.auction.setAuction(props),
  },
};

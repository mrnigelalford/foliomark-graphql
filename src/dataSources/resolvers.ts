import { Auction } from '../Types/Auction.type';
import { Collection } from '../Types/Collection.type';

export default {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.assets.getAssetByID(id),
    assets: (_, __, { dataSources }) => dataSources.assets.getAllAssets(),
    auctions: (_, __, { dataSources }) => dataSources.auctions.getAllAuctions(),
    auction: (_, { id }, { dataSources }) =>
      dataSources.auctions.getAuctionByID({ id }),
    authors: (_, __, { dataSources }) => dataSources.authors.getAllAuthors(),
    author: (_, { id }, { dataSources }) =>
      dataSources.authors.getAuthorByID({ id }),
    collections: (_, __, { dataSources }) =>
      dataSources.collections.getAllCollections(),
    collection: (_, { id }, { dataSources }) =>
      dataSources.collections.getCollectionByID({ id }),
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
    setAuthor: (_, props: Auction, { dataSources }) =>
      dataSources.authors.setAuthor(props),
    setCollection: (_, props: Collection, { dataSources }) =>
      dataSources.collections.setCollection(props),
  },
};

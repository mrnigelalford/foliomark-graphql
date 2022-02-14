export default {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.assets.getAssetByID(id),
    assets: (_, __, { dataSources }) => dataSources.assets.getAllAssets(),
    author: (_, { id }, { dataSources }) =>
      dataSources.authors.getAuthorByID({ id }),
  },
};

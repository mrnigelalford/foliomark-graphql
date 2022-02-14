import MongoDataSource from 'apollo-mongodb-datasource';

export default class Asset extends MongoDataSource {
  getAssetByID(id: string) {
    const asset = this.findOne({ id });
    asset.then((res) => console.log('findByID: ', res));
    return asset;
  }

  getAllAssets() {
    const asset = this.find();
    asset.then((res) => console.log('findAll: ', res));
    return asset;
  }
}

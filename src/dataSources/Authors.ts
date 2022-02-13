import MongoDataSource from 'apollo-mongodb-datasource'

export default class Authors extends MongoDataSource {
  getAuthor(id) {
    return this.findOne(id)
  }
}
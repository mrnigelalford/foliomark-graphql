import MongoDataSource from 'apollo-mongodb-datasource'

export default class Authors extends MongoDataSource {
  getAuthorByID(id: string) {
    return this.findOne(id)
  }
}
const { MongoClient, ServerApiVersion } = require('mongodb');

// const user = process.env.mongodbuser;
// const pw = process.env.mongodbpw;


// replace this with GRAPhQL calls


const user = 'user';
const pw = 'pw';

const uri = process.env.mongoURL;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const setData = () => {
    mongoClient.connect(async (err, client) => {
      const db = client.db("foliomark").collection("web");
      await db.insertOne({name: 'test name', otherProp: 'super cool prop'});
      client.close();
    });
}

export const getData = async () => {
  return MongoClient.connect(async (err, client) => {
    const count = await client.db("foliomark").collection("web").countDocuments().then(count => count)
    
    client.close();
    return count;
  });
  
};
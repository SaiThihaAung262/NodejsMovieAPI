const { MongoClient } = require("mongodb");

const _uri = process.env.MONGODB_URI;
const dbConneciton = (coll, cb, coll2) => {
  MongoClient.connect(_uri)
    .then(async (client) => {
      const db = client.db("sample_mflix").collection(coll);
      let db2;
      if (coll2) {
        db2 = client.db("sample_mflix").collection(coll2);
      }
      await cb(db, db2);
      client.close();
    })
    .catch((err) => {
      console.log("have some error : ", err);
    });
};

module.exports = dbConneciton;
